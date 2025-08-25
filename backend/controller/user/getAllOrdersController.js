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
          grossTotal: obj.grossTotal ?? 0,
          discount: obj.discount ?? 0,
          finalAmount: obj.finalAmount ?? obj.grossTotal ?? 0,
          coupon: obj.coupon
            ? {
                code: obj.coupon.code || null,
                discountType: obj.coupon.discountType || null,
                discountValue: obj.coupon.discountValue || 0,
              }
            : null, // ✅ now always structured
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
