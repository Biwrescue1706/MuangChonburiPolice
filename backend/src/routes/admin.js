import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const admin = Router();

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