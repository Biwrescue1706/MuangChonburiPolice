
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be configured securely");
}

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded === "string"
    ) {
      return res.status(401).json({
        error: "Invalid session",
      });
    }

    req.admin = decoded;

    return next();
  } catch {
    return res.status(401).json({
      error: "Invalid or expired session",
    });
  }
};
