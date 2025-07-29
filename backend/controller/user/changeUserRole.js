// backend/controller/user/changeUserRole.js
import userModel from "../../models/userModel.js";

const changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID and role are required",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Role updated to ${role} for ${updatedUser.name}`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Change role error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating role",
      error: err.message,
    });
  }
};

export default changeUserRole;
