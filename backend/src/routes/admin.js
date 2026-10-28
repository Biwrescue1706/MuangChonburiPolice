
import { Router } from "express";
import bcrypt from "bcryptjs";
import neonPrisma from "../neon.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const admin = Router();

const MAX_PAGE_SIZE = 100;
const MIN_PASSWORD_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 128;
const MAX_USERNAME_LENGTH = 50;
const MAX_NAME_LENGTH = 100;
const MAX_POSITION_LENGTH = 100;

// ตรวจสอบ username และข้อความที่รับจาก client
function isValidText(value, maxLength) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= maxLength
  );
}

// แปลงข้อมูลแอดมินโดยไม่ส่ง password กลับไป
function safeAdmin(user) {
  if (!user) return null;

  const {
    password,
    ...result
  } = user;

  return result;
}

// จัดการข้อผิดพลาดโดยไม่เปิดเผยรายละเอียดภายใน
function handleError(res, error, operation) {
  if (error?.code === "P2002") {
    return res.status(409).json({
      error: "Username already exists",
    });
  }

  if (error?.code === "P2025") {
    return res.status(404).json({
      error: "Admin not found",
    });
  }

  console.error(`${operation} failed:`, {
    code: error?.code,
    name: error?.name,
  });

  return res.status(500).json({
    error: "Internal Server Error",
  });
}

// ปิดการสมัครสมาชิกสาธารณะโดยกำหนดให้ต้องผ่าน authentication
admin.post("/register", authMiddleware, async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      position,
    } = req.body ?? {};

    if (!isValidText(username, MAX_USERNAME_LENGTH)) {
      return res.status(400).json({
        error: "Invalid username",
      });
    }

    if (
      typeof password !== "string" ||
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      return res.status(400).json({
        error: `Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters`,
      });
    }

    if (
      name !== undefined &&
      name !== null &&
      (typeof name !== "string" || name.length > MAX_NAME_LENGTH)
    ) {
      return res.status(400).json({
        error: "Invalid name",
      });
    }

    if (
      position !== undefined &&
      position !== null &&
      (typeof position !== "string" ||
        position.length > MAX_POSITION_LENGTH)
    ) {
      return res.status(400).json({
        error: "Invalid position",
      });
    }

    const cleanUsername = username.trim();

    const hash = await bcrypt.hash(password, 12);

    const user = await neonPrisma.admin.create({
      data: {
        username: cleanUsername,
        password: hash,
        name: name?.trim() || null,
        position: position?.trim() || null,
      },
    });

    return res.status(201).json({
      message: "สร้างสมาชิกสำเร็จ",
      admin: safeAdmin(user),
    });
  } catch (error) {
    return handleError(res, error, "Admin registration");
  }
});

// อ่านโปรไฟล์ของผู้ใช้ที่ตรงกับ JWT
admin.get("/me", authMiddleware, async (req, res) => {
  try {
    if (!req.admin?.adminId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const user = await neonPrisma.admin.findUnique({
      where: {
        adminId: req.admin.adminId,
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
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    return res.json(user);
  } catch (error) {
    return handleError(res, error, "Get profile");
  }
});

// แสดงรายชื่อแอดมินแบบแบ่งหน้า
admin.get("/getall", authMiddleware, async (req, res) => {
  try {
    const pageText = req.query.page ?? "1";

    if (
      typeof pageText !== "string" ||
      !/^[1-9]\d{0,7}$/.test(pageText)
    ) {
      return res.status(400).json({
        error: "Invalid page",
      });
    }

    const page = Number(pageText);
    const limit = 20;

    const [admins, total] = await Promise.all([
      neonPrisma.admin.findMany({
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
      }),
      neonPrisma.admin.count(),
    ]);

    return res.json({
      data: admins,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(res, error, "Get admin list");
  }
});

// แก้ไขโปรไฟล์ของตัวเองโดยรับเฉพาะฟิลด์ที่อนุญาต
admin.put("/me", authMiddleware, async (req, res) => {
  try {
    if (!req.admin?.adminId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const {
      username,
      name,
      position,
    } = req.body ?? {};

    const data = {};

    if (username !== undefined) {
      if (!isValidText(username, MAX_USERNAME_LENGTH)) {
        return res.status(400).json({
          error: "Invalid username",
        });
      }

      data.username = username.trim();
    }

    if (name !== undefined) {
      if (
        name !== null &&
        (typeof name !== "string" || name.length > MAX_NAME_LENGTH)
      ) {
        return res.status(400).json({
          error: "Invalid name",
        });
      }

      data.name = name?.trim() || null;
    }

    if (position !== undefined) {
      if (
        position !== null &&
        (typeof position !== "string" ||
          position.length > MAX_POSITION_LENGTH)
      ) {
        return res.status(400).json({
          error: "Invalid position",
        });
      }

      data.position = position?.trim() || null;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        error: "No valid fields provided",
      });
    }

    data.updatedAt = new Date();

    const updated = await neonPrisma.admin.update({
      where: {
        adminId: req.admin.adminId,
      },
      data,
      select: {
        adminId: true,
        username: true,
        name: true,
        position: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: "อัปเดตสำเร็จ",
      admin: updated,
    });
  } catch (error) {
    return handleError(res, error, "Update profile");
  }
});

// อ่านข้อมูลแอดมินตาม ID
admin.get("/:adminId", authMiddleware, async (req, res) => {
  try {
    const { adminId } = req.params;

    if (!adminId || adminId.length > 128) {
      return res.status(400).json({
        error: "Invalid admin ID",
      });
    }

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
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    return res.json(user);
  } catch (error) {
    return handleError(res, error, "Get admin");
  }
});

// ลบแอดมินโดยป้องกันการลบบัญชีตัวเองและบัญชีแรกที่สร้าง
admin.delete("/:adminId", authMiddleware, async (req, res) => {
  try {
    const { adminId } = req.params;

    if (!req.admin?.adminId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    if (!adminId || adminId.length > 128) {
      return res.status(400).json({
        error: "Invalid admin ID",
      });
    }

    if (req.admin.adminId === adminId) {
      return res.status(400).json({
        error: "ไม่สามารถลบบัญชีตัวเองได้",
      });
    }

    const firstAdmin = await neonPrisma.admin.findFirst({
      orderBy: [
        { createdAt: "asc" },
        { adminId: "asc" },
      ],
      select: {
        adminId: true,
      },
    });

    if (firstAdmin?.adminId === adminId) {
      return res.status(403).json({
        error: "ไม่สามารถลบ Admin หลักของระบบได้",
      });
    }

    await neonPrisma.admin.delete({
      where: {
        adminId,
      },
    });

    return res.json({
      message: "ลบ admin สำเร็จ",
    });
  } catch (error) {
    return handleError(res, error, "Delete admin");
  }
});

export default admin;
