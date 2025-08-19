// controller/user/handleSignin.js
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

const handleSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Normalize email
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // 2️⃣ Compare password (plain input vs hashed in DB)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4️⃣ Send token in cookie + response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      success: true,
      message: "Login successful",
      token, // frontend can use this in localStorage or headers
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic || "",
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export default handleSignin;
