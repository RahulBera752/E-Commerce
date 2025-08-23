import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";

const getallOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user")
      .populate("items.productId");

    res.json({
      success: true,
      data: orders.map((order) => {
        const obj = order.toObject();

        return {
          ...obj,
          total: obj.total,                  // ✅ total before discount
          discount: obj.discount,            // ✅ discount applied
          finalAmount: obj.finalAmount,      // ✅ total after discount
          coupon: obj.coupon || null,        // ✅ coupon details
          probableDeliveryDate: obj.probableDeliveryDate || null,
        };
      }),
    });
  } catch (error) {
    console.error("❌ getallOrdersController error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default getallOrdersController;
