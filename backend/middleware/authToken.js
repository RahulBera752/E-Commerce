import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authToken = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // ✅ Also check "Authorization: Bearer <token>"
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("📌 Incoming token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // ✅ Verify JWT token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("📌 Decoded token:", decode);

    // ✅ Use "decode.id" since we signed token as { id: user._id }
    req.userId = decode.id;

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token payload",
      });
    }

    next();
  } catch (err) {
    console.error("authToken error:", err.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export default authToken;
