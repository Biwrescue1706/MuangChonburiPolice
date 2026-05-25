import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const auth = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET)
  throw new Error("JWT_SECRET missing");

/* ================= LOGIN ================= */
auth.post("/login", async (req, res) => {
  try {

    const {
      username,
      password,
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "ข้อมูลไม่ครบ",
      });
    }

    /* ===== trim only ===== */
    const cleanUsername =
      username.trim();

    /* ===== find user ===== */
    const adminUser =
      await prisma.admin.findUnique({
        where: {
          username: cleanUsername,
        },
      });

    if (!adminUser) {
      return res.status(401).json({
        error: "ไม่พบบัญชีผู้ใช้",
      });
    }

    /* ===== compare password ===== */
    const valid =
      await bcrypt.compare(
        password,
        adminUser.password
      );

    if (!valid) {
      return res.status(401).json({
        error: "รหัสผ่านไม่ถูกต้อง",
      });
    }

    /* ===== create token ===== */
    const token = jwt.sign(
      {
        adminId: adminUser.adminId,
      },
      JWT_SECRET,
      {
        expiresIn: "90m",
      }
    );

    const isProd =
      process.env.NODE_ENV === "production";

    /* ===== cookie ===== */
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",

      ...(isProd && {
        domain:
          ".smartdorm-biwboong.shop",
      }),

      path: "/",

      maxAge:
        90 * 60 * 1000,
    });

    /* ===== response ===== */
    res.json({
      message: "เข้าสู่ระบบสำเร็จ",

      admin: {
        adminId:
          adminUser.adminId,

        username:
          adminUser.username,

        name:
          adminUser.name,

        position:
          adminUser.position,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Login error",
    });
  }
});

/* ================= VERIFY ================= */
auth.get("/verify", async (req, res) => {
  try {

    const token =
      req.cookies?.token;

    if (!token)
      return res.sendStatus(401);

    const decoded =
      jwt.verify(token, JWT_SECRET);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.adminId
    ) {
      return res.sendStatus(401);
    }

    const adminUser =
      await prisma.admin.findUnique({
        where: {
          adminId:
            decoded.adminId,
        },

        select: {
          adminId: true,
          username: true,
          name: true,
          position: true,
        },
      });

    if (!adminUser)
      return res.sendStatus(401);

    res.json({
      admin: adminUser,
    });

  } catch (err) {
    console.error(
      "VERIFY ERROR:",
      err
    );

    res.sendStatus(401);
  }
});

/* ================= LOGOUT ================= */
auth.post("/logout", (_req, res) => {

  const isProd =
    process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite:
      isProd ? "none" : "lax",

    ...(isProd && {
      domain:
        ".smartdorm-biwboong.shop",
    }),

    path: "/",
  });

  res.json({
    message:
      "ออกจากระบบสำเร็จ",
  });
});

/* ================= CHANGE PASSWORD ================= */
auth.put(
  "/change-password",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        oldPassword,
        newPassword,
      } = req.body;

      if (
        !oldPassword ||
        !newPassword
      ) {
        return res.status(400).json({
          error: "ข้อมูลไม่ครบ",
        });
      }

      const user =
        await prisma.admin.findUnique({
          where: {
            adminId:
              req.admin.adminId,
          },
        });

      if (!user) {
        return res.status(404).json({
          error: "ไม่พบผู้ใช้",
        });
      }

      /* ===== validate ===== */
      if (
        oldPassword === newPassword
      ) {
        return res.status(400).json({
          error:
            "รหัสใหม่ต้องไม่เหมือนรหัสเดิม",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error:
            "รหัสใหม่ต้องอย่างน้อย 6 ตัวอักษร",
        });
      }

      /* ===== check old ===== */
      const valid =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!valid) {
        return res.status(401).json({
          error:
            "รหัสเดิมไม่ถูกต้อง",
        });
      }

      /* ===== hash ===== */
      const hash =
        await bcrypt.hash(
          newPassword,
          10
        );

      /* ===== update ===== */
      await prisma.admin.update({
        where: {
          adminId:
            user.adminId,
        },

        data: {
          password: hash,
        },
      });

      res.json({
        message:
          "เปลี่ยนรหัสผ่านสำเร็จ",
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

/* ================= FORGOT CHECK ================= */
auth.post(
  "/forgot/check",
  async (req, res) => {
    try {

      const { username } =
        req.body;

      if (!username) {
        return res.status(400).json({
          error:
            "กรุณากรอก username",
        });
      }

      const cleanUsername =
        username.trim();

      const user =
        await prisma.admin.findUnique({
          where: {
            username:
              cleanUsername,
          },

          select: {
            username: true,
            name: true,
          },
        });

      if (!user) {
        return res.status(404).json({
          error:
            "ไม่พบผู้ใช้",
        });
      }

      res.json({
        admin: user,
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Server error",
      });
    }
  }
);

/* ================= RESET PASSWORD ================= */
auth.put(
  "/forgot/reset",
  async (req, res) => {
    try {

      const {
        username,
        newPassword,
      } = req.body;

      if (
        !username ||
        !newPassword
      ) {
        return res.status(400).json({
          error: "ข้อมูลไม่ครบ",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error:
            "รหัสผ่านต้องอย่างน้อย 6 ตัว",
        });
      }

      const cleanUsername =
        username.trim();

      /* ===== check user ===== */
      const exist =
        await prisma.admin.findUnique({
          where: {
            username:
              cleanUsername,
          },
        });

      if (!exist) {
        return res.status(404).json({
          error:
            "ไม่พบผู้ใช้",
        });
      }

      /* ===== hash ===== */
      const hash =
        await bcrypt.hash(
          newPassword,
          10
        );

      /* ===== update ===== */
      await prisma.admin.update({
        where: {
          username:
            cleanUsername,
        },

        data: {
          password: hash,
        },
      });

      res.json({
        message:
          "ตั้งรหัสใหม่สำเร็จ",
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Reset error",
      });
    }
  }
);

export default auth;