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

  const { username, password, name, position } = req.body;

  if (!username || !password)
    return res.status(400).json({
      error: "ข้อมูลไม่ครบ",
    });

  const exist = await prisma.admin.findUnique({
    where: { username },
  });

  if (exist)
    return res.status(400).json({
      error: "username ถูกใช้งานแล้ว",
    });

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.admin.create({
    data: { username, password: hash, name, position },
  });

  res.json({
    message: "สร้างสมาชิกสำเร็จ",
    admin: user,
  });
});


// ================= LOGIN =================
admin.post("/login", async (req, res) => {

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


// ================= VERIFY =================
admin.get("/verify", async (req, res) => {

  const token = req.cookies?.token;

  if (!token)
    return res.status(401).json({
      error: "Unauthorized",
    });

  try {

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.admin.findUnique({
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
        error: "ไม่พบผู้ใช้",
      });

    res.json({
      admin: {
        adminId: user.id,
        username: user.username,
        name: user.name,
        position: user.position,
      },
    });

  } catch {
    res.status(401).json({
      error: "Token invalid",
    });
  }
});


// ================= MY PROFILE =================
admin.get("/me",
authMiddleware,
async (req, res) => {

  const user = await prisma.admin.findUnique({
    where: { id: req.admin.adminId },
  });

  if (!user)
    return res.status(404).json({
      error: "ไม่พบข้อมูล",
    });

  res.json(user);
});


// ================= UPDATE PROFILE =================
admin.put("/me",
authMiddleware,
async (req, res) => {

  const { username, name, position } = req.body;

  const updated = await prisma.admin.update({
    where: { id: req.admin.adminId },
    data: { username, name, position },
  });

  res.json({
    message: "อัปเดตสำเร็จ",
    admin: updated,
  });
});


// ================= CHANGE PASSWORD =================
admin.put("/change-password",
authMiddleware,
async (req, res) => {

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return res.status(400).json({
      error: "ข้อมูลไม่ครบ",
    });

  const user = await prisma.admin.findUnique({
    where: { id: req.admin.adminId },
  });

  const valid = await bcrypt.compare(
    oldPassword,
    user.password
  );

  if (!valid)
    return res.status(401).json({
      error: "รหัสเดิมไม่ถูกต้อง",
    });

  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.admin.update({
    where: { id: user.id },
    data: { password: hash },
  });

  res.json({
    message: "เปลี่ยนรหัสผ่านสำเร็จ",
  });
});


// ================= FORGOT CHECK =================
admin.post("/forgot/check", async (req, res) => {

  const { username } = req.body;

  const user = await prisma.admin.findUnique({
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

  res.json({
    admin: user,
  });
});


// ================= RESET PASSWORD =================
admin.put("/forgot/reset", async (req, res) => {

  const { username, newPassword } = req.body;

  if (!username || !newPassword)
    return res.status(400).json({
      error: "ข้อมูลไม่ครบ",
    });

  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.admin.update({
    where: { username },
    data: { password: hash },
  });

  res.json({
    message: "ตั้งรหัสใหม่สำเร็จ",
  });
});

export default admin;