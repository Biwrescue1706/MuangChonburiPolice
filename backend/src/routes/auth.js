import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const auth = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

/* ================= LOGIN ================= */
auth.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        error: "กรอกข้อมูลไม่ครบ",
      });

    const user = await prisma.admin.findUnique({
      where: { username },
    });

    if (!user)
      return res.status(404).json({
        error: "ไม่พบผู้ใช้",
      });

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid)
      return res.status(401).json({
        error: "รหัสผ่านไม่ถูกต้อง",
      });

    const token = jwt.sign(
      {
        adminId: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "90m" }
    );

    const isProd =
      process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 90 * 60 * 1000,
    });

    res.json({
      message: "เข้าสู่ระบบสำเร็จ",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Login error",
    });
  }
});


/* ================= LOGOUT ================= */
auth.post("/logout", (_req, res) => {

  const isProd =
    process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });

  res.json({
    message: "ออกจากระบบสำเร็จ",
  });
});


/* ================= VERIFY ================= */
auth.get("/verify", async (req, res) => {
  try {

    const token = req.cookies?.token;

    if (!token)
      return res.status(401).json({
        valid: false,
      });

    const decoded =
      jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string")
      return res.status(401).json({
        valid: false,
      });

    const user =
      await prisma.admin.findUnique({
        where: { id: decoded.adminId },
        select: {
          id: true,
          username: true,
          name: true,
          position: true,
        },
      });

    if (!user)
      return res.status(404).json({
        valid: false,
      });

    res.json({
      valid: true,
      admin: {
        adminId: user.id,
        username: user.username,
        name: user.name,
        position: user.position,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({
      valid: false,
    });
  }
});


/* ================= PROFILE ================= */
auth.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {

      const user =
        await prisma.admin.findUnique({
          where: {
            id: req.admin.adminId,
          },
        });

      if (!user)
        return res.status(404).json({
          error: "ไม่พบข้อมูล",
        });

      res.json(user);

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Server error",
      });
    }
  }
);


/* ================= CHANGE PASSWORD ================= */
auth.put(
  "/change-password",
  authMiddleware,
  async (req, res) => {
    try {

      const { oldPassword, newPassword } =
        req.body;

      const user =
        await prisma.admin.findUnique({
          where: {
            id: req.admin.adminId,
          },
        });

      if (!user)
        return res.status(404).json({
          error: "ไม่พบผู้ใช้",
        });

      const valid =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!valid)
        return res.status(401).json({
          error: "รหัสเดิมไม่ถูกต้อง",
        });

      const hash =
        await bcrypt.hash(newPassword, 10);

      await prisma.admin.update({
        where: { id: user.id },
        data: { password: hash },
      });

      res.json({
        message: "เปลี่ยนรหัสผ่านสำเร็จ",
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Change password error",
      });
    }
  }
);


/* ================= FORGOT CHECK ================= */
auth.post("/forgot/check", async (req, res) => {
  try {

    const { username } = req.body;

    const user =
      await prisma.admin.findUnique({
        where: { username },
        select: {
          username: true,
          name: true,
        },
      });

    if (!user)
      return res.status(404).json({
        error: "ไม่พบผู้ใช้",
      });

    res.json({ admin: user });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
});


/* ================= RESET PASSWORD ================= */
auth.put("/forgot/reset", async (req, res) => {
  try {

    const { username, newPassword } =
      req.body;

    if (!username || !newPassword)
      return res.status(400).json({
        error: "ข้อมูลไม่ครบ",
      });

    const hash =
      await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { username },
      data: { password: hash },
    });

    res.json({
      message: "ตั้งรหัสใหม่สำเร็จ",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Reset error",
    });
  }
});

export default auth;