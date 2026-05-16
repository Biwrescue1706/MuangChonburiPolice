import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const admin = Router();

/* ================= REGISTER ================= */
admin.post("/register", async (req, res) => {
  try {

    const {
      username,
      password,
      name,
      position,
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "ข้อมูลไม่ครบ",
      });
    }

    /* ===== trim only ===== */
    const cleanUsername =
      username.trim();

    /* ===== validate password ===== */
    if (password.length < 6) {
      return res.status(400).json({
        error:
          "รหัสผ่านต้องอย่างน้อย 6 ตัว",
      });
    }

    /* ===== check exist ===== */
    const exist =
      await prisma.admin.findUnique({
        where: {
          username: cleanUsername,
        },
      });

    if (exist) {
      return res.status(400).json({
        error:
          "username ถูกใช้งานแล้ว",
      });
    }

    /* ===== hash ===== */
    const hash =
      await bcrypt.hash(password, 10);

    /* ===== create ===== */
    const user =
      await prisma.admin.create({
        data: {
          username: cleanUsername,
          password: hash,
          name,
          position,
        },
      });

    /* ===== hide password ===== */
    const {
      password: _,
      ...safeUser
    } = user;

    res.json({
      message:
        "สร้างสมาชิกสำเร็จ",

      admin: safeUser,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Register error",
    });
  }
});

/* ================= PROFILE ================= */
admin.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {

      const user =
        await prisma.admin.findUnique({
          where: {
            adminId:
              req.admin.adminId,
          },
        });

      if (!user)
        return res.sendStatus(404);

      /* ===== hide password ===== */
      const {
        password,
        ...safeUser
      } = user;

      res.json(safeUser);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Profile error",
      });
    }
  }
);

/* ================= GET ALL ADMINS ================= */
admin.get(
  "/getall",
  authMiddleware,
  async (req, res) => {
    try {

      const page =
        Number(req.query.page || 1);

      const limit = 20;

      const admins =
        await prisma.admin.findMany({
          skip:
            (page - 1) * limit,

          take: limit,

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

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error:
          "Get admins error",
      });
    }
  }
);

/* ================= UPDATE PROFILE ================= */
admin.put(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        username,
        name,
        position,
      } = req.body;

      const cleanUsername =
        username?.trim();

      const updated =
        await prisma.admin.update({
          where: {
            adminId:
              req.admin.adminId,
          },

          data: {
            username:
              cleanUsername,

            name,
            position,

            updatedAt:
              new Date(),
          },
        });

      const {
        password,
        ...safeUser
      } = updated;

      res.json({
        message:
          "อัปเดตสำเร็จ",

        admin: safeUser,
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error:
          "Update profile error",
      });
    }
  }
);

/* ================= GET ADMIN BY ID ================= */
admin.get(
  "/:adminId",
  authMiddleware,
  async (req, res) => {
    try {

      const { adminId } =
        req.params;

      const user =
        await prisma.admin.findUnique({
          where: {
            adminId,
          },

          select: {
            adminId: true,
            username: true,
            name: true,
            position: true,
            createdAt: true,
            updatedAt: true,
          },
        });

      if (!user)
        return res.sendStatus(404);

      res.json(user);

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error:
          "Get admin error",
      });
    }
  }
);

/* ================= DELETE ADMIN ================= */
admin.delete(
  "/:adminId",
  authMiddleware,
  async (req, res) => {
    try {

      const { adminId } =
        req.params;

      /* ===== ห้ามลบตัวเอง ===== */
      if (
        req.admin.adminId === adminId
      ) {
        return res.status(400).json({
          error:
            "ไม่สามารถลบบัญชีตัวเองได้",
        });
      }

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
      if (
        firstAdmin?.adminId === adminId
      ) {
        return res.status(400).json({
          error:
            "ไม่สามารถลบ Admin หลักของระบบได้",
        });
      }

      /* ===== check exist ===== */
      const exist =
        await prisma.admin.findUnique({
          where: {
            adminId,
          },
        });

      if (!exist) {
        return res.status(404).json({
          error:
            "ไม่พบ admin",
        });
      }

      /* ===== delete ===== */
      await prisma.admin.delete({
        where: {
          adminId,
        },
      });

      res.json({
        message:
          "ลบ admin สำเร็จ",
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error:
          "Delete admin error",
      });
    }
  }
);

export default admin;