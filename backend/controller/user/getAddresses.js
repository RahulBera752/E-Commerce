import User from "../../models/userModel.js";

const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email phone addresses");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message || "Server error" });
  }
};

export default getAddresses;
