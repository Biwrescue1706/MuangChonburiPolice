import { Router } from "express";
import bcrypt from "bcryptjs";
import neonPrisma from "../neon.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const admin = Router();

// Register
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

    // Trim username
    const cleanUsername = username.trim();

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        error: "รหัสผ่านต้องอย่างน้อย 6 ตัว",
      });
    }

    // Check username
    const exist = await neonPrisma.admin.findUnique({
      where: {
        username: cleanUsername,
      },
    });

    if (exist) {
      return res.status(400).json({
        error: "username ถูกใช้งานแล้ว",
      });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create admin
    const user = await neonPrisma.admin.create({
      data: {
        username: cleanUsername,
        password: hash,
        name,
        position,
      },
    });

    // Hide password
    const {
      password: _,
      ...safeUser
    } = user;

    res.json({
      message: "สร้างสมาชิกสำเร็จ",
      admin: safeUser,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Register error",
    });
  }
});

// Profile
admin.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await neonPrisma.admin.findUnique({
      where: {
        adminId: req.admin.adminId,
      },
    });

    if (!user) {
      return res.sendStatus(404);
    }

    // Hide password
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
});

// Get all admins
admin.get("/getall", authMiddleware, async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = 20;

    const admins = await neonPrisma.admin.findMany({
      skip: (page - 1) * limit,
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
      error: "Get admins error",
    });
  }
});

// Update profile
admin.put("/me", authMiddleware, async (req, res) => {
  try {
    const {
      username,
      name,
      position,
    } = req.body;

    const cleanUsername = username?.trim();

    // Check duplicate username
    if (cleanUsername) {
      const exist = await neonPrisma.admin.findFirst({
        where: {
          username: cleanUsername,
          NOT: {
            adminId: req.admin.adminId,
          },
        },
      });

      if (exist) {
        return res.status(400).json({
          error: "username ถูกใช้งานแล้ว",
        });
      }
    }

    const updated = await neonPrisma.admin.update({
      where: {
        adminId: req.admin.adminId,
      },
      data: {
        username: cleanUsername,
        name,
        position,
        updatedAt: new Date(),
      },
    });

    // Hide password
    const {
      password,
      ...safeUser
    } = updated;

    res.json({
      message: "อัปเดตสำเร็จ",
      admin: safeUser,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Update profile error",
    });
  }
});

// Get admin by ID
admin.get("/:adminId", authMiddleware, async (req, res) => {
  try {
    const { adminId } = req.params;

    const user = await neonPrisma.admin.findUnique({
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

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Get admin error",
    });
  }
});

// Delete admin
admin.delete("/:adminId", authMiddleware, async (req, res) => {
  try {
    const { adminId } = req.params;

    // Prevent self delete
    if (req.admin.adminId === adminId) {
      return res.status(400).json({
        error: "ไม่สามารถลบบัญชีตัวเองได้",
      });
    }

    // Find first admin
    const firstAdmin = await neonPrisma.admin.findFirst({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        adminId: true,
      },
    });

    // Prevent deleting main admin
    if (firstAdmin?.adminId === adminId) {
      return res.status(400).json({
        error: "ไม่สามารถลบ Admin หลักของระบบได้",
      });
    }

    // Check admin
    const exist = await neonPrisma.admin.findUnique({
      where: {
        adminId,
      },
    });

    if (!exist) {
      return res.status(404).json({
        error: "ไม่พบ admin",
      });
    }

    // Delete admin
    await neonPrisma.admin.delete({
      where: {
        adminId,
      },
    });

    res.json({
      message: "ลบ admin สำเร็จ",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Delete admin error",
    });
  }
});

export default admin;