import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js"; // ✅ FIX: register User schema

const getallOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user") // ✅ FIXED: this must match schema field name
      .populate("items.productId");

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("❌ getallOrdersController error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default getallOrdersController;
