// backend/controller/user/resetPassword.js
import jwt from "jsonwebtoken";
import UserModel from "../../models/userModel.js";

export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Token and new password are required" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Just set the new password (hook will hash it)
    user.password = newPassword;
    await user.save();

    return res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};
