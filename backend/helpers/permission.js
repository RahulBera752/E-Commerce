import userModel from "../models/userModel.js";

// Allow only 'ADMIN' or 'SELLER' to add/update products
const uploadProductPermission = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    return user && (user.role === "ADMIN" || user.role === "SELLER");
  } catch (error) {
    console.error("Permission check failed:", error);
    return false;
  }
};

export default uploadProductPermission;
