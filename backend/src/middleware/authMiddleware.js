import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET)
  throw new Error("JWT_SECRET missing");

export const authMiddleware = (req, res, next) => {

  try {

    // ✅ อ่าน token จาก cookie
    const token = req.cookies?.token;

    if (!token)
      return res.status(401).json({
        error: "Unauthorized"
      });

    // ✅ verify JWT
    const decoded =
      jwt.verify(token, JWT_SECRET);

    // ✅ ส่งข้อมูล user ต่อไป
    req.admin = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      error: "Session expired"
    });

  }
};