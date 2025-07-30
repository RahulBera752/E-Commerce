// controller/user/viewUserOrders.js
import Order from "../../models/orderModel.js";

const viewUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId })
      .populate("items.productId") // 💡 This is the key line
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export default viewUserOrders;
