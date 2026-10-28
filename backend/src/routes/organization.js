
// src/routes/organization.js
import express from "express";
import neonPrisma from "../neon.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import { fileTypeFromBuffer } from "file-type";
import { createClient } from "@supabase/supabase-js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const PAGE_SIZE = 20;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase configuration");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
});

// Build full name.
function buildFullName({
  firstName,
  lastName,
  rank,
} = {}) {
  const first = String(firstName ?? "").trim();
  const last = String(lastName ?? "").trim();
  const title = String(rank ?? "").trim();

  const fullName = `${first} ${last}`.trim();
  const fullNameWithRank = title
    ? `${title}${fullName ? ` ${fullName}` : ""}`.trim()
    : fullName;

  return {
    fullName,
    fullNameWithRank,
  };
}

// Check whether a value is a plain object.
function isObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

// Keep only explicitly permitted fields.
function pickFields(source, fields) {
  const result = {};

  for (const field of fields) {
    if (
      Object.prototype.hasOwnProperty.call(source, field) &&
      source[field] !== undefined &&
      source[field] !== null &&
      source[field] !== ""
    ) {
      if (typeof source[field] !== "string") {
        throw new Error(`ฟิลด์ ${field} ต้องเป็นข้อความ`);
      }

      result[field] = source[field].trim();
    }
  }

  return result;
}

function sendServerError(res, err, message) {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;

    return res.status(status).json({
      error:
        status === 413
          ? "ไฟล์มีขนาดเกิน 2 MB"
          : "ข้อมูลไฟล์ไม่ถูกต้อง",
    });
  }

  if (err.message?.startsWith("ฟิลด์ ")) {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "ไม่พบข้อมูล",
    });
  }

  if (err.code === "P2002") {
    return res.status(409).json({
      error: "ข้อมูลซ้ำกับรายการที่มีอยู่",
    });
  }

  console.error(
    "[organization route]",
    err.code || err.name || "Error"
  );

  return res.status(500).json({
    error: message,
  });
}

// Organization fields that may be updated.
const ORGANIZATION_FIELDS = [
  "organizationName",
  "rank",
  "firstName",
  "lastName",
  "position",
];

// Commander fields that may be updated.
// Adjust these against the actual Prisma schema.
const COMMANDER_FIELDS = [
  "rank",
  "fullRank",
  "firstName",
  "lastName",
  "position",
  "fullPosition",
];

// Finance fields that may be updated.
// Adjust these against the actual Prisma schema.
const FINANCE_FIELDS = [
  "rank",
  "firstName",
  "lastName",
  "position",
];

// Get all organizations.
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page ?? 1);

    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      page > 100000
    ) {
      return res.status(400).json({
        error: "หมายเลขหน้าไม่ถูกต้อง",
      });
    }

    const [data, total] = await Promise.all([
      neonPrisma.organization.findMany({
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          organizationId: true,
          organizationName: true,
          firstName: true,
          lastName: true,
          rank: true,
          fullName: true,
          fullNameWithRank: true,
          position: true,
          createdAt: true,
          commander: {
            select: {
              rank: true,
              fullRank: true,
              firstName: true,
              lastName: true,
              fullName: true,
              position: true,
              fullPosition: true,
              fullNameWithRank: true,
              signatureImage: true,
            },
          },
          finance: {
            select: {
              rank: true,
              firstName: true,
              lastName: true,
              fullName: true,
              fullNameWithRank: true,
              position: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      neonPrisma.organization.count(),
    ]);

    return res.json({
      data,
      pagination: {
        page,
        limit: PAGE_SIZE,
        total,
        totalPages: Math.ceil(total / PAGE_SIZE),
      },
    });
  } catch (err) {
    return sendServerError(
      res,
      err,
      "ดึงข้อมูลองค์กรไม่สำเร็จ"
    );
  }
});

// Get one organization.
router.get("/:id", async (req, res) => {
  try {
    const data = await neonPrisma.organization.findUnique({
      where: {
        organizationId: req.params.id,
      },
      include: {
        commander: true,
        finance: true,
      },
    });

    if (!data) {
      return res.status(404).json({
        error: "ไม่พบข้อมูลองค์กร",
      });
    }

    return res.json(data);
  } catch (err) {
    return sendServerError(
      res,
      err,
      "ดึงข้อมูลองค์กรไม่สำเร็จ"
    );
  }
});

// Update organization.
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    if (!isObject(req.body)) {
      return res.status(400).json({
        error: "รูปแบบข้อมูลไม่ถูกต้อง",
      });
    }

    const { id } = req.params;

    const existing = await neonPrisma.organization.findUnique({
      where: {
        organizationId: id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        error: "ไม่พบข้อมูลองค์กร",
      });
    }

    const clean = pickFields(req.body, ORGANIZATION_FIELDS);

    const firstName = clean.firstName ?? existing.firstName;
    const lastName = clean.lastName ?? existing.lastName;
    const rank = clean.rank ?? existing.rank;

    const names = buildFullName({
      firstName,
      lastName,
      rank,
    });

    clean.fullName = names.fullName;
    clean.fullNameWithRank = names.fullNameWithRank;
    clean.updatedAt = new Date();

    const result = await neonPrisma.organization.update({
      where: {
        organizationId: id,
      },
      data: clean,
    });

    return res.json(result);
  } catch (err) {
    return sendServerError(
      res,
      err,
      "แก้ไขข้อมูลองค์กรไม่สำเร็จ"
    );
  }
});

// Get commander.
router.get("/:id/commander", async (req, res) => {
  try {
    const data =
      await neonPrisma.organizationCommander.findUnique({
        where: {
          organizationId: req.params.id,
        },
      });

    if (!data) {
      return res.status(404).json({
        error: "ไม่พบข้อมูลผู้บังคับบัญชา",
      });
    }

    return res.json(data);
  } catch (err) {
    return sendServerError(
      res,
      err,
      "ดึงข้อมูลผู้บังคับบัญชาไม่สำเร็จ"
    );
  }
});

// Update commander.
router.patch(
  "/:id/commander",
  authMiddleware,
  async (req, res) => {
    try {
      if (!isObject(req.body)) {
        return res.status(400).json({
          error: "รูปแบบข้อมูลไม่ถูกต้อง",
        });
      }

      const { id } = req.params;

      const organization =
        await neonPrisma.organization.findUnique({
          where: {
            organizationId: id,
          },
          select: {
            organizationId: true,
          },
        });

      if (!organization) {
        return res.status(404).json({
          error: "ไม่พบข้อมูลองค์กร",
        });
      }

      const clean = pickFields(req.body, COMMANDER_FIELDS);
      const names = buildFullName(clean);

      clean.fullName = names.fullName;
      clean.fullNameWithRank = names.fullNameWithRank;
      clean.updatedAt = new Date();

      const result =
        await neonPrisma.organizationCommander.upsert({
          where: {
            organizationId: id,
          },
          update: clean,
          create: {
            organizationId: id,
            ...clean,
          },
        });

      return res.json(result);
    } catch (err) {
      return sendServerError(
        res,
        err,
        "แก้ไขข้อมูลผู้บังคับบัญชาไม่สำเร็จ"
      );
    }
  }
);

// Upload signature image.
router.post(
  "/:id/upload-signature",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    let uploadedFileName = null;

    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          error: "กรุณาเลือกไฟล์ภาพ",
        });
      }

      const org = await neonPrisma.organization.findUnique({
        where: {
          organizationId: id,
        },
        select: {
          organizationId: true,
        },
      });

      if (!org) {
        return res.status(404).json({
          error: "ไม่พบข้อมูลองค์กร",
        });
      }

      // Verify actual file signature rather than trusting MIME type.
      const detected = await fileTypeFromBuffer(file.buffer);

      const allowedTypes = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/webp": "webp",
      };

      if (
        !detected ||
        !allowedTypes[detected.mime]
      ) {
        return res.status(400).json({
          error: "รองรับเฉพาะไฟล์ PNG, JPG และ WEBP",
        });
      }

      const fileName =
        `signature_${crypto.randomUUID()}.${allowedTypes[detected.mime]}`;

      uploadedFileName = fileName;

      const { error: uploadError } = await supabase.storage
        .from("signatures")
        .upload(fileName, file.buffer, {
          contentType: detected.mime,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicData } = supabase.storage
        .from("signatures")
        .getPublicUrl(fileName);

      if (!publicData?.publicUrl) {
        throw new Error("Unable to create public URL");
      }

      // Save the new image URL before attempting old-file cleanup.
      const previous =
        await neonPrisma.organizationCommander.findUnique({
          where: {
            organizationId: id,
          },
          select: {
            signatureImage: true,
          },
        });

      await neonPrisma.organizationCommander.upsert({
        where: {
          organizationId: id,
        },
        update: {
          signatureImage: publicData.publicUrl,
          updatedAt: new Date(),
        },
        create: {
          organizationId: id,
          signatureImage: publicData.publicUrl,
        },
      });

      // Remove the previous file only if its URL belongs to this bucket.
      if (previous?.signatureImage) {
        try {
          const oldUrl = new URL(previous.signatureImage);
          const currentUrl = new URL(supabaseUrl);

          const oldPrefix =
            `/storage/v1/object/public/signatures/`;

          if (
            oldUrl.origin === currentUrl.origin &&
            oldUrl.pathname.startsWith(oldPrefix)
          ) {
            const oldPath = decodeURIComponent(
              oldUrl.pathname.slice(oldPrefix.length)
            );

            if (oldPath && oldPath !== fileName) {
              const { error: removeError } =
                await supabase.storage
                  .from("signatures")
                  .remove([oldPath]);

              if (removeError) {
                console.warn(
                  "[organization] Previous signature cleanup failed"
                );
              }
            }
          }
        } catch {
          console.warn(
            "[organization] Previous signature URL could not be cleaned up"
          );
        }
      }

      return res.json({
        message: "Upload success",
        url: publicData.publicUrl,
      });
    } catch (err) {
      // Delete the new file if the database operation failed.
      if (uploadedFileName) {
        try {
          await supabase.storage
            .from("signatures")
            .remove([uploadedFileName]);
        } catch {
          // Keep the original error for logging.
        }
      }

      return sendServerError(
        res,
        err,
        "อัปโหลดรูปลายเซ็นไม่สำเร็จ"
      );
    }
  }
);

// Get finance.
router.get("/:id/finance", async (req, res) => {
  try {
    const data =
      await neonPrisma.organizationFinance.findUnique({
        where: {
          organizationId: req.params.id,
        },
      });

    if (!data) {
      return res.status(404).json({
        error: "ไม่พบข้อมูลการเงิน",
      });
    }

    return res.json(data);
  } catch (err) {
    return sendServerError(
      res,
      err,
      "ดึงข้อมูลการเงินไม่สำเร็จ"
    );
  }
});

// Update finance.
router.patch(
  "/:id/finance",
  authMiddleware,
  async (req, res) => {
    try {
      if (!isObject(req.body)) {
        return res.status(400).json({
          error: "รูปแบบข้อมูลไม่ถูกต้อง",
        });
      }

      const { id } = req.params;

      const organization =
        await neonPrisma.organization.findUnique({
          where: {
            organizationId: id,
          },
          select: {
            organizationId: true,
          },
        });

      if (!organization) {
        return res.status(404).json({
          error: "ไม่พบข้อมูลองค์กร",
        });
      }

      const clean = pickFields(req.body, FINANCE_FIELDS);
      const names = buildFullName(clean);

      clean.fullName = names.fullName;
      clean.fullNameWithRank = names.fullNameWithRank;
      clean.updatedAt = new Date();

      const result =
        await neonPrisma.organizationFinance.upsert({
          where: {
            organizationId: id,
          },
          update: clean,
          create: {
            organizationId: id,
            ...clean,
          },
        });

      return res.json(result);
    } catch (err) {
      return sendServerError(
        res,
        err,
        "แก้ไขข้อมูลการเงินไม่สำเร็จ"
      );
    }
  }
);

export default router;
