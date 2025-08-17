import userModel from "../../models/userModel.js";

const userDetailsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        isAdmin: user.isAdmin,
      },
      message: "User details fetched successfully",
    });
  } catch (err) {
    console.error("Error in userDetailsController:", err.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default userDetailsController;
