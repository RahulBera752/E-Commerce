import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables like JWT_SECRET

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // 🔐 Check if token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // 🧾 Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Attach user ID to request object
    req.userId = decode.id;

    next(); // ✅ Proceed to next middleware/controller
  } catch (err) {
    console.error("authToken error:", err); // 🐛 Debug if token fails
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export default authToken;
