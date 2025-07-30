import Order from "../../models/orderModel.js";
import productModel from "../../models/productModel.js";
import mongoose from "mongoose";

const placeOrderController = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { name, phone, address, items, paymentMethod, total } = req.body;

    // ✅ Ensure user is authenticated
    if (!req.userId) {
      await session.abortTransaction();
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user ID",
      });
    }

    // ✅ Validate fields
    if (!items?.length) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    if (!name || !phone || !address) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const orderItems = [];
    let calculatedTotal = 0;

    // ✅ Validate and build each product entry
    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "Invalid cart items",
        });
      }

      const product = await productModel.findById(item.productId).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.productName}`,
        });
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

    // ✅ Check for total mismatch
    if (Math.abs(calculatedTotal - total) > 0.01) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Total amount mismatch",
      });
    }

    // ✅ Log data before saving
    console.log("🧾 Creating order with:", {
      user: req.userId,
      name,
      phone,
      address,
      items: orderItems,
      paymentMethod,
      total: calculatedTotal,
    });

    // ✅ Create the order
    const order = new Order({
      user: req.userId,
      name,
      phone,
      address,
      items: orderItems,
      paymentMethod: paymentMethod || "COD",
      total: calculatedTotal,
      status: "PLACED",
    });

    await order.save({ session });
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
      orderTotal: order.total,
    });

  } catch (error) {
    await session.abortTransaction();
    console.error("🔥 ORDER ERROR STACK TRACE:");
    console.error(error?.stack || error);

    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  } finally {
    session.endSession();
  }
};

export default placeOrderController;
