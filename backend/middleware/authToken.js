import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables (e.g., JWT_SECRET)

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token from cookie

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify JWT token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to the request for use in protected routes
    req.userId = decode.id;

    next(); // Continue to the next middleware or route
  } catch (err) {
    console.error("authToken error:", err.message || err);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export default authToken;
