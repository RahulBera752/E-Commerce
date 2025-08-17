import User from "../../models/userModel.js";

const addAddress = async (req, res) => {
  try {
    const payload = req.body; // {label,line1,line2,city,state,pin,phone,isDefault}
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // set first address or explicit flag as default
    const makeDefault = user.addresses.length === 0 || payload.isDefault === true;
    if (makeDefault) user.addresses.forEach(a => (a.isDefault = false));

    user.addresses.push({ ...payload, isDefault: makeDefault });
    await user.save();

    res.json({ success: true, message: "Address added", data: user.addresses });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message || "Server error" });
  }
};

export default addAddress;
