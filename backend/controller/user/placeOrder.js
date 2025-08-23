import Order from "../../models/orderModel.js";
import productModel from "../../models/productModel.js";
import mongoose from "mongoose";

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
      total, // client-side final amount
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

    if (!name || !phone || !address) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const orderItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: "Invalid cart items" });
      }

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

    // ✅ Save order with correct schema fields
    const order = new Order({
      user: req.userId,
      name,
      phone,
      address,
      items: orderItems,
      paymentMethod: paymentMethod || "COD",
      grossTotal: calculatedTotal,     // ✅ matches schema
      discount: discountApplied,       // ✅ matches schema
      finalAmount: finalAmount,        // ✅ matches schema
      coupon: couponCode
        ? { code: couponCode, discountType, discountValue }
        : null,
      status: "PLACED",
    });

    await order.save({ session });
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
      grossTotal: order.grossTotal,
      discountApplied: order.discount,
      finalAmount: order.finalAmount,
      coupon: order.coupon,
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("🔥 ORDER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
};

export default placeOrderController;
