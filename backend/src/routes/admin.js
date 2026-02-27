import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const admin = Router();

/* ================= GET ALL ADMINS ================= */
admin.get(
  "/",
  authMiddleware,
  async (_req, res) => {
    try {

      const admins = await prisma.admin.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          position: true,
          createdAt: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      res.json(admins);

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Fetch admins failed",
      });
    }
  }
);


/* ================= GET ADMIN BY ID ================= */
admin.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const id = Number(req.params.id);

      const user =
        await prisma.admin.findUnique({
          where: { id },
          select: {
            id: true,
            username: true,
            name: true,
            position: true,
          },
        });

      if (!user)
        return res.status(404).json({
          error: "ไม่พบ admin",
        });

      res.json(user);

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Fetch admin failed",
      });
    }
  }
);


/* ================= CREATE ADMIN ================= */
admin.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      const { username, password, name, position } =
        req.body;

      if (!username || !password)
        return res.status(400).json({
          error: "ข้อมูลไม่ครบ",
        });

      const exist =
        await prisma.admin.findUnique({
          where: { username },
        });

      if (exist)
        return res.status(400).json({
          error: "username ถูกใช้งานแล้ว",
        });

      const hash =
        await bcrypt.hash(password, 10);

      const newAdmin =
        await prisma.admin.create({
          data: {
            username,
            password: hash,
            name,
            position,
          },
        });

      res.json({
        message: "สร้าง admin สำเร็จ",
        admin: newAdmin,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Create admin failed",
      });
    }
  }
);


/* ================= UPDATE ADMIN ================= */
admin.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const id = Number(req.params.id);
      const { username, name, position } =
        req.body;

      const updated =
        await prisma.admin.update({
          where: { id },
          data: {
            username,
            name,
            position,
          },
        });

      res.json({
        message: "แก้ไข admin สำเร็จ",
        admin: updated,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Update failed",
      });
    }
  }
);


/* ================= DELETE ADMIN ================= */
admin.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      const id = Number(req.params.id);

      // ⭐ กันลบตัวเอง
      if (id === req.admin.adminId)
        return res.status(400).json({
          error: "ไม่สามารถลบบัญชีตัวเองได้",
        });

      await prisma.admin.delete({
        where: { id },
      });

      res.json({
        message: "ลบ admin สำเร็จ",
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Delete failed",
      });
    }
  }
);

export default admin;