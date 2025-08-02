import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env variables

const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // 🔐 Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🪙 Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 🍪 Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ✅ Respond with token and user data
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token, // ✅ Token added here
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.isAdmin ? "ADMIN" : "GENERAL",
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export default userSignInController;
