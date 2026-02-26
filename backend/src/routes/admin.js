import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const admin = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

// ================= REGISTER =================
admin.post("/register", async (req, res) => {

  const { username, password, name, position } =
    req.body;

  const exist =
    await prisma.admin.findUnique({
      where: { username },
    });

  if (exist)
    return res.status(400).json({
      error: "username ถูกใช้งานแล้ว",
    });

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.admin.create({
    data: {
      username,
      password: hash,
      name,
      position,
    },
  });

  res.json({
    message: "สร้างสมาชิกสำเร็จ",
    admin: user,
  });
});


// ================= LOGIN =================
admin.post("/login", async (req, res) => {

  const { username, password } = req.body;

  const user =
    await prisma.admin.findUnique({
      where: { username },
    });

  if (!user)
    return res.status(401).json({
      error: "ไม่พบผู้ใช้",
    });

  const valid =
    await bcrypt.compare(
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
const isProd = process.env.NODE_ENV === "production";

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
});


// ================= LOGOUT =================
admin.post("/logout", (_req, res) => {
  const isProd = process.env.NODE_ENV === "production";

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

// ================= VERIFY SESSION =================
admin.get("/verify", (req, res) => {

  const token = req.cookies?.token;
  if (!token)
    return res.status(401).json({
      valid: false,
    });

  try {
    const decoded =
      jwt.verify(token, JWT_SECRET);

    res.json({
      valid: true,
      admin: decoded,
    });
  } catch {
    res.status(401).json({
      valid: false,
    });
  }
});


// ================= MY PROFILE =================
admin.get("/me",
authMiddleware,
async (req, res) => {

  const user =
    await prisma.admin.findUnique({
      where: { id: req.admin.adminId },
    });

  res.json(user);
});


// ================= UPDATE MY PROFILE =================
admin.put("/me",
authMiddleware,
async (req, res) => {

  const { username, name, position } =
    req.body;

  const updated =
    await prisma.admin.update({
      where: { id: req.admin.adminId },
      data: {
        username,
        name,
        position,
      },
    });

  res.json({
    message: "อัปเดตสำเร็จ",
    admin: updated,
  });
});


// ================= CHANGE PASSWORD =================
admin.put(
"/change-password",
authMiddleware,
async (req, res) => {

  const { oldPassword, newPassword } =
    req.body;

  const user =
    await prisma.admin.findUnique({
      where: { id: req.admin.adminId },
    });

  const valid =
    await bcrypt.compare(
      oldPassword,
      user.password
    );

  if (!valid)
    return res.status(400).json({
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
});


// ================= FORGOT CHECK =================
admin.post("/forgot/check",
async (req, res) => {

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
      found: false,
    });

  res.json({
    found: true,
      admin: user,
  });
});


// ================= RESET PASSWORD =================
admin.put("/forgot/reset",
async (req, res) => {

  const { username, newPassword } =
    req.body;

  const hash =
    await bcrypt.hash(newPassword, 10);

  await prisma.admin.update({
    where: { username },
    data: { password: hash },
  });

  res.json({
    message: "ตั้งรหัสใหม่สำเร็จ",
  });
});

export default admin;