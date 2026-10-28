
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import neonPrisma from "../neon.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const auth = Router();

const JWT_SECRET = process.env.JWT_SECRET;
const IS_PROD = process.env.NODE_ENV === "production";
const TOKEN_EXPIRES_IN = "90m";
const COOKIE_MAX_AGE = 90 * 60 * 1000;
const MIN_PASSWORD_LENGTH = 12;
const MAX_PASSWORD_BYTES = 72;
const BCRYPT_ROUNDS = 12;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax",
  ...(IS_PROD && {
    domain: ".smartdorm-biwboong.shop",
  }),
  path: "/",
};

if (!JWT_SECRET || Buffer.byteLength(JWT_SECRET, "utf8") < 32) {
  throw new Error("JWT_SECRET must be configured securely");
}

// ตรวจสอบว่ารหัสผ่านมีความยาวตามนโยบายและไม่เกินขนาดที่ bcrypt รองรับ
function isValidNewPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= MIN_PASSWORD_LENGTH &&
    Buffer.byteLength(password, "utf8") <= MAX_PASSWORD_BYTES
  );
}

// ตรวจสอบ username ก่อนนำไปค้นหาในฐานข้อมูล
function isValidUsername(username) {
  return (
    typeof username === "string" &&
    username.trim().length > 0 &&
    username.trim().length <= 50
  );
}

// บันทึกเฉพาะรายละเอียดข้อผิดพลาดที่ไม่เปิดเผยข้อมูลลับ
function logError(operation, error) {
  console.error(operation, {
    code: error?.code,
    name: error?.name,
  });
}

// Login
auth.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body ?? {};

    if (
      !isValidUsername(username) ||
      typeof password !== "string" ||
      password.length === 0 ||
      Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES
    ) {
      return res.status(400).json({
        error: "ข้อมูลไม่ถูกต้อง",
      });
    }

    const cleanUsername = username.trim();

    const adminUser = await neonPrisma.admin.findUnique({
      where: {
        username: cleanUsername,
      },
    });

    // ใช้ข้อความเดียวกันเมื่อไม่พบบัญชีหรือรหัสผ่านไม่ถูกต้อง
    if (
      !adminUser ||
      !(await bcrypt.compare(password, adminUser?.password ?? ""))
    ) {
      return res.status(401).json({
        error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
      });
    }

    const token = jwt.sign(
      {
        adminId: adminUser.adminId,
      },
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: TOKEN_EXPIRES_IN,
      }
    );

    res.cookie("token", token, {
      ...COOKIE_OPTIONS,
      maxAge: COOKIE_MAX_AGE,
    });

    return res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ",
      admin: {
        adminId: adminUser.adminId,
        username: adminUser.username,
        name: adminUser.name,
        position: adminUser.position,
      },
    });
  } catch (error) {
    logError("Login failed", error);

    return res.status(500).json({
      error: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
});

// Verify
auth.get("/verify", async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.adminId !== "string"
    ) {
      return res.status(401).json({
        error: "Invalid session",
      });
    }

    const adminUser = await neonPrisma.admin.findUnique({
      where: {
        adminId: decoded.adminId,
      },
      select: {
        adminId: true,
        username: true,
        name: true,
        position: true,
      },
    });

    if (!adminUser) {
      res.clearCookie("token", COOKIE_OPTIONS);

      return res.status(401).json({
        error: "Invalid session",
      });
    }

    return res.json({
      admin: adminUser,
    });
  } catch {
    res.clearCookie("token", COOKIE_OPTIONS);

    return res.status(401).json({
      error: "Invalid or expired session",
    });
  }
});

// Logout
auth.post("/logout", (_req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);

  return res.json({
    message: "ออกจากระบบสำเร็จ",
  });
});

// Change password
auth.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body ?? {};

    if (
      typeof oldPassword !== "string" ||
      oldPassword.length === 0 ||
      Buffer.byteLength(oldPassword, "utf8") > MAX_PASSWORD_BYTES ||
      !isValidNewPassword(newPassword)
    ) {
      return res.status(400).json({
        error: `รหัสผ่านใหม่ต้องมีอย่างน้อย ${MIN_PASSWORD_LENGTH} ตัว และมีขนาดไม่เกิน ${MAX_PASSWORD_BYTES} ไบต์`,
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        error: "รหัสผ่านใหม่ต้องไม่เหมือนรหัสผ่านเดิม",
      });
    }

    if (!req.admin?.adminId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const user = await neonPrisma.admin.findUnique({
      where: {
        adminId: req.admin.adminId,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const valid = await bcrypt.compare(oldPassword, user.password);

    if (!valid) {
      return res.status(401).json({
        error: "รหัสผ่านเดิมไม่ถูกต้อง",
      });
    }

    const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await neonPrisma.admin.update({
      where: {
        adminId: user.adminId,
      },
      data: {
        password: hash,
      },
    });

    // ล้าง cookie ปัจจุบันเพื่อให้ผู้ใช้เข้าสู่ระบบใหม่หลังเปลี่ยนรหัสผ่าน
    res.clearCookie("token", COOKIE_OPTIONS);

    return res.json({
      message: "เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบใหม่",
    });
  } catch (error) {
    logError("Change password failed", error);

    return res.status(500).json({
      error: "เกิดข้อผิดพลาดภายในระบบ",
    });
  }
});

// ปิดการตรวจสอบบัญชีผ่านระบบลืมรหัสผ่านเพื่อป้องกันการเปิดเผย username
auth.post("/forgot/check", (_req, res) => {
  return res.status(410).json({
    error: "ระบบกู้คืนบัญชียังไม่พร้อมใช้งาน กรุณาติดต่อผู้ดูแลระบบ",
  });
});

// ปิดการรีเซ็ตรหัสผ่านที่ไม่มีขั้นตอนยืนยันตัวตน
auth.put("/forgot/reset", (_req, res) => {
  return res.status(410).json({
    error: "ระบบกู้คืนบัญชียังไม่พร้อมใช้งาน กรุณาติดต่อผู้ดูแลระบบ",
  });
});

export default auth;
