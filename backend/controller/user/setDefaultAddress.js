import User from "../../models/userModel.js";

const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params; // address _id
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let found = false;
    user.addresses.forEach(a => {
      if (String(a._id) === String(id)) { a.isDefault = true; found = true; }
      else { a.isDefault = false; }
    });
    if (!found) return res.status(404).json({ success: false, message: "Address not found" });

    await user.save();
    res.json({ success: true, message: "Default address updated", data: user.addresses });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message || "Server error" });
  }
};

export default setDefaultAddress;
