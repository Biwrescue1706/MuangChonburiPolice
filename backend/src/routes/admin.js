import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const admin = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

/* ================= REGISTER ================= */
admin.post("/register", async (req, res) => {
  try {
    const { username, password, name, position } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "ข้อมูลไม่ครบ" });

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

    const { password: _, ...safeUser } = user;

    res.json({
      message: "สร้างสมาชิกสำเร็จ",
      admin: safeUser,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Register error" });
  }
});

/* ================= LOGIN ================= */
admin.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const adminUser = await prisma.admin.findUnique({
      where: { username },
    });

    if (!adminUser)
      return res.status(401).json({
        error: "ไม่พบบัญชีผู้ใช้",
      });

    const valid = await bcrypt.compare(
      password,
      adminUser.password
    );

    if (!valid)
      return res.status(401).json({
        error: "รหัสผ่านไม่ถูกต้อง",
      });

    const token = jwt.sign(
      { adminId: adminUser.adminId },
      JWT_SECRET,
      { expiresIn: "90m" }
    );

    const isProd =
      process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      ...(isProd && {
        domain: ".smartdorm-biwboong.shop",
      }),
      path: "/",
      maxAge: 90 * 60 * 1000,
    });

    res.json({
      message: "เข้าสู่ระบบสำเร็จ",
      admin: {
        adminId: adminUser.adminId,
        username: adminUser.username,
        name: adminUser.name,
        position: adminUser.position,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login error" });
  }
});

/* ================= VERIFY ================= */
admin.get("/verify", async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.adminId)
      return res.sendStatus(401);

    const adminUser =
      await prisma.admin.findUnique({
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

    if (!adminUser)
      return res.sendStatus(401);

    res.json({ admin: adminUser });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.sendStatus(401);
  }
});

/* ================= LOGOUT ================= */
admin.post("/logout", (_req, res) => {

  const isProd =
    process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    ...(isProd && {
      domain: ".smartdorm-biwboong.shop",
    }),
    path: "/",
  });

  res.json({
    message: "ออกจากระบบสำเร็จ",
  });
});

/* ================= PROFILE ================= */
admin.get("/me",
  authMiddleware,
  async (req, res) => {
    const user =
      await prisma.admin.findUnique({
        where: {
          adminId: req.admin.adminId,
        },
      });

    if (!user)
      return res.sendStatus(404);

    res.json(user);
  }
);

/* ================= GET ALL ADMINS ================= */
admin.get("/getall",
  authMiddleware,
  async (_req, res) => {

    const admins =
      await prisma.admin.findMany({
        select: {
          adminId: true,
          username: true,
          name: true,
          position: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(admins);
  }
);

/* ================= UPDATE PROFILE ================= */
admin.put("/me",
  authMiddleware,
  async (req, res) => {

    const { username, name, position } =
      req.body;

    const updated =
      await prisma.admin.update({
        where: {
          adminId: req.admin.adminId,
        },
        data: {
          username,
          name,
          position,
          updatedAt: new Date(),
        },
      });

    res.json({
      message: "อัปเดตสำเร็จ",
      admin: updated,
    });
  }
);

/* ================= CHANGE PASSWORD ================= */
admin.put("/change-password",
  authMiddleware,
  async (req, res) => {

    const { oldPassword, newPassword } =
      req.body;

    const user =
      await prisma.admin.findUnique({
        where: {
          adminId: req.admin.adminId,
        },
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
      where: {
        adminId: user.adminId,
      },
      data: { password: hash },
    });

    res.json({
      message: "เปลี่ยนรหัสผ่านสำเร็จ",
    });
  }
);

/* ================= ADMIN CRUD ================= */
/* ⭐ dynamic route ต้องอยู่ล่างสุด */

admin.get("/:adminId",
  authMiddleware,
  async (req, res) => {

    const { adminId } = req.params;

    const user =
      await prisma.admin.findUnique({
        where: { adminId },
      });

    if (!user)
      return res.sendStatus(404);

    res.json(user);
  }
);

admin.put("/:adminId",
  authMiddleware,
  async (req, res) => {

    const { adminId } = req.params;

    if (req.admin.adminId === adminId)
      return res.status(400).json({
        error: "ไม่สามารถแก้ไขตัวเองผ่าน route นี้",
      });

    const updated =
      await prisma.admin.update({
        where: { adminId },
        data: req.body,
      });

    res.json(updated);
  }
);

admin.delete(
  "/:adminId",
  authMiddleware,
  async (req, res) => {

    const { adminId } = req.params;

    /* ===== ห้ามลบตัวเอง ===== */
    if (req.admin.adminId === adminId)
      return res.status(400).json({
        error: "ไม่สามารถลบบัญชีตัวเองได้",
      });

    /* ===== หา admin คนแรก ===== */
    const firstAdmin =
      await prisma.admin.findFirst({
        orderBy: {
          createdAt: "asc",
        },
        select: {
          adminId: true,
        },
      });

    /* ===== ห้ามลบ super admin ===== */
    if (firstAdmin?.adminId === adminId)
      return res.status(400).json({
        error: "ไม่สามารถลบ Admin หลักของระบบได้",
      });

    /* ===== DELETE ===== */
    await prisma.admin.delete({
      where: { adminId },
    });

    res.json({
      message: "ลบ admin สำเร็จ",
    });
  }
);

export default admin;