import Order from "../../models/orderModel.js";
import mongoose from "mongoose";

const getMyOrdersController = async (req, res) => {
  try {
    // Verify user authentication
    const userId = req.user?._id || req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Validate page and limit parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Fetch orders with pagination
    const ordersQuery = Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Only populate if Product model exists
    if (mongoose.modelNames().includes('Product')) {
      ordersQuery.populate({
        path: 'items.productId',
        model: 'Product',
        select: 'productName sellingPrice productImage'
      });
    }

    const [orders, totalCount] = await Promise.all([
      ordersQuery.exec(),
      Order.countDocuments({ user: userId })
    ]);

    // Format response data
    const formattedOrders = orders.map(order => ({
      ...order.toObject(),
      items: order.items.map(item => ({
        ...item,
        // Fallback to embedded data if population failed
        productId: item.productId?._id || item.productId,
        productName: item.productId?.productName || item.productName,
        sellingPrice: item.productId?.sellingPrice || item.sellingPrice,
        productImage: item.productId?.productImage || item.productImage
      }))
    }));

    res.status(200).json({
      success: true,
      data: {
        orders: formattedOrders,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit)
      },
      message: "Orders fetched successfully"
    });

  } catch (err) {
    console.error("Order controller error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export default getMyOrdersController;