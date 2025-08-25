import Order from "../../models/orderModel.js";
import productModel from "../../models/productModel.js";
import mongoose from "mongoose";

// ================= PLACE ORDER WITH STOCK & COUPON =================
const placeOrderController = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const {
      name,
      phone,
      address,
      items,
      paymentMethod,
      total,
      couponCode,
      discountType,
      discountValue,
    } = req.body;

    if (!req.userId) {
      await session.abortTransaction();
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!items?.length) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const orderItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const product = await productModel.findById(item.productId).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.productName}` });
      }

      product.stock -= item.quantity;
      await product.save({ session });

      const itemTotal = product.sellingPrice * item.quantity;
      calculatedTotal += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        productName: product.productName,
        sellingPrice: product.sellingPrice,
        productImage: product.productImage,
      });
    }

    // ✅ Calculate discount
    let discountApplied = 0;
    if (couponCode && discountType && discountValue) {
      if (discountType === "PERCENT") {
        discountApplied = (calculatedTotal * discountValue) / 100;
      } else if (discountType === "FLAT") {
        discountApplied = discountValue;
      }
    }
    const finalAmount = Math.max(0, calculatedTotal - discountApplied);

    if (Math.abs(finalAmount - total) > 0.01) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Total mismatch" });
    }

    const order = new Order({
      user: req.userId,
      name,
      phone,
      address,
      items: orderItems,
      paymentMethod: paymentMethod || "COD",
      grossTotal: calculatedTotal,
      discount: discountApplied,
      finalAmount,
      coupon: couponCode ? { code: couponCode, discountType, discountValue } : null,
      status: "PLACED",
    });

    await order.save({ session });
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("🔥 ORDER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
};
// ================= MY ORDERS =================
const getMyOrdersController = async (req, res) => {
  try {
    const userId = req.user?._id || req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const ordersQuery = Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("items.productId", "productName sellingPrice productImage");

    const [orders, totalCount] = await Promise.all([
      ordersQuery.exec(),
      Order.countDocuments({ user: userId }),
    ]);

    // ✅ Ensure numbers & coupon always returned
    const formattedOrders = orders.map((order) => ({
      ...order.toObject(),
      grossTotal: order.grossTotal ?? 0,
      discount: order.discount ?? 0,
      finalAmount: order.finalAmount ?? order.grossTotal ?? 0,
      coupon: order.coupon || null,
      items: order.items.map((item) => ({
        ...item.toObject(),
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
    });
  } catch (err) {
    console.error("Order controller error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ================= CANCEL ORDER =================
const cancelOrderController = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user?._id || req.userId;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (!["PLACED", "PROCESSING"].includes(order.status)) {
      return res.status(400).json({ success: false, message: "Order cannot be cancelled at this stage" });
    }

    order.status = "CANCELLED";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ success: false, message: "Server error while cancelling order" });
  }
};

export default {
  placeOrderController,
  getMyOrdersController,
  cancelOrderController,
};
