import express from "express";
import neonPrisma from "../neon.js";
import multer from "multer";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

// Build full name
function buildFullName({
  firstName,
  lastName,
  rank,
}) {
  const fullName =
    `${firstName || ""} ${lastName || ""}`.trim();

  const fullNameWithRank = rank
    ? `${rank}${firstName || ""} ${lastName || ""}`.trim()
    : fullName;

  return {
    fullName,
    fullNameWithRank,
  };
}

// Get all organizations
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = 20;

    const data =
      await neonPrisma.organization.findMany({
        skip: (page - 1) * limit,
        take: limit,
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
      });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Fetch failed",
    });
  }
});

// Get organization
router.get("/:id", async (req, res) => {
  try {
    const data =
      await neonPrisma.organization.findUnique({
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
        error: "Not found",
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Fetch failed",
    });
  }
});

// Update organization
router.patch(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const existing =
        await neonPrisma.organization.findUnique({
          where: {
            organizationId: id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          error: "Organization not found",
        });
      }

      // Whitelist
      const allowedFields = [
        "organizationName",
        "rank",
        "firstName",
        "lastName",
        "position",
      ];

      const clean = {};

      for (const key of allowedFields) {
        if (
          data[key] !== "" &&
          data[key] !== null &&
          data[key] !== undefined
        ) {
          clean[key] = data[key];
        }
      }

      const name = buildFullName({
        firstName:
          clean.firstName ??
          existing.firstName,
        lastName:
          clean.lastName ??
          existing.lastName,
        rank:
          clean.rank ??
          existing.rank,
      });

      clean.fullName = name.fullName;
      clean.fullNameWithRank =
        name.fullNameWithRank;
      clean.updatedAt = new Date();

      const result =
        await neonPrisma.organization.update({
          where: {
            organizationId: id,
          },
          data: clean,
        });

      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: "Update failed",
      });
    }
  }
);

// Get commander
router.get(
  "/:id/commander",
  async (req, res) => {
    try {
      const data =
        await neonPrisma.organizationCommander.findUnique({
          where: {
            organizationId: req.params.id,
          },
        });

      res.json(data);
    } catch (err) {
      res.status(500).json({
        error: "Fetch commander failed",
      });
    }
  }
);

// Update commander
router.patch(
  "/:id/commander",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const name = buildFullName(data);

      const result =
        await neonPrisma.organizationCommander.upsert({
          where: {
            organizationId: id,
          },
          update: {
            ...data,
            fullName: name.fullName,
            fullNameWithRank:
              name.fullNameWithRank,
            updatedAt: new Date(),
          },
          create: {
            organizationId: id,
            ...data,
            fullName: name.fullName,
            fullNameWithRank:
              name.fullNameWithRank,
          },
        });

      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: "Update commander failed",
      });
    }
  }
);

// Upload signature
router.post(
  "/:id/upload-signature",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          error: "No file uploaded",
        });
      }

      // Allow image
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
      ];

      if (
        !allowedTypes.includes(
          file.mimetype
        )
      ) {
        return res.status(400).json({
          error:
            "Only png jpg webp allowed",
        });
      }

      // Check organization
      const org =
        await neonPrisma.organization.findUnique({
          where: {
            organizationId: id,
          },
        });

      if (!org) {
        return res.status(404).json({
          error:
            "Organization not found",
        });
      }

      // Delete old signature
      const existingCommander =
        await neonPrisma.organizationCommander.findUnique({
          where: {
            organizationId: id,
          },
        });

      if (
        existingCommander?.signatureImage
      ) {
        try {
          const oldPath =
            existingCommander.signatureImage
              .split("/signatures/")[1];

          if (oldPath) {
            await supabase.storage
              .from("signatures")
              .remove([oldPath]);
          }
        } catch (e) {
          console.warn(
            "Delete old image fail:",
            e.message
          );
        }
      }

      // Create filename
      const ext =
        file.originalname
          .split(".")
          .pop()
          ?.toLowerCase();

      const fileName =
        `signature_${id}_${crypto.randomUUID()}.${ext}`;

      // Upload signature
      const { error } =
        await supabase.storage
          .from("signatures")
          .upload(
            fileName,
            file.buffer,
            {
              contentType:
                file.mimetype,
            }
          );

      if (error) {
        throw error;
      }

      // Get public URL
      const { data } =
        supabase.storage
          .from("signatures")
          .getPublicUrl(fileName);

      const publicUrl =
        data.publicUrl;

      // Save URL to database
      await neonPrisma.organizationCommander.upsert({
        where: {
          organizationId: id,
        },
        update: {
          signatureImage:
            publicUrl,
          updatedAt:
            new Date(),
        },
        create: {
          organizationId: id,
          signatureImage:
            publicUrl,
        },
      });

      res.json({
        message: "Upload success",
        url: publicUrl,
      });
    } catch (err) {
      res.status(500).json({
        error: "Upload failed",
      });
    }
  }
);

// Get finance
router.get(
  "/:id/finance",
  async (req, res) => {
    try {
      const data =
        await neonPrisma.organizationFinance.findUnique({
          where: {
            organizationId:
              req.params.id,
          },
        });

      res.json(data);
    } catch (err) {
      res.status(500).json({
        error: "Fetch finance failed",
      });
    }
  }
);

// Update finance
router.patch(
  "/:id/finance",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const name = buildFullName(data);

      const result =
        await neonPrisma.organizationFinance.upsert({
          where: {
            organizationId: id,
          },
          update: {
            ...data,
            fullName: name.fullName,
            fullNameWithRank:
              name.fullNameWithRank,
            updatedAt: new Date(),
          },
          create: {
            organizationId: id,
            ...data,
            fullName: name.fullName,
            fullNameWithRank:
              name.fullNameWithRank,
          },
        });

      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: "Update finance failed",
      });
    }
  }
);

export default router;