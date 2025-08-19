import Order from "../../models/orderModel.js";
import mongoose from "mongoose";

// ================= MY ORDERS =================
const getMyOrdersController = async (req, res) => {
  try {
    const userId = req.user?._id || req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const ordersQuery = Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (mongoose.modelNames().includes("Product")) {
      ordersQuery.populate({
        path: "items.productId",
        model: "Product",
        select: "productName sellingPrice productImage",
      });
    }

    const [orders, totalCount] = await Promise.all([
      ordersQuery.exec(),
      Order.countDocuments({ user: userId }),
    ]);

    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      items: order.items.map((item) => ({
        ...item,
        productId: item.productId?._id || item.productId,
        productName: item.productId?.productName || item.productName,
        sellingPrice: item.productId?.sellingPrice || item.sellingPrice,
        productImage: item.productId?.productImage || item.productImage,
      })),
    }));

    res.status(200).json({
      success: true,
      data: {
        orders: formattedOrders,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      },
      message: "Orders fetched successfully",
    });
  } catch (err) {
    console.error("Order controller error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error:
        process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// ================= CANCEL ORDER =================
const cancelOrderController = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user?._id || req.userId;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });
    }

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Allow cancellation only if order is still new
    if (!["PLACED", "PROCESSING"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }

    order.status = "CANCELLED";
    await order.save();

    return res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while cancelling order",
    });
  }
};

// ✅ Default export (object with both controllers)
export default {
  getMyOrdersController,
  cancelOrderController,
};
