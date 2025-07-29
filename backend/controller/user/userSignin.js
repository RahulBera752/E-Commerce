import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import dotenv from "dotenv";

dotenv.config(); // ✅ Ensure environment variables like JWT_SECRET are loaded

const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // 🔐 Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // 🪙 Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 🍪 Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax", // ✅ Works on localhost
      secure: false,   // ❗ Do NOT set to true without HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // ✅ Send user data (excluding password)
    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.isAdmin ? "ADMIN" : "GENERAL", // 👤 For frontend role logic
      },
    });

  } catch (err) {
    console.error("Login Error:", err); // 🔍 Log backend error
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export default userSignInController;
