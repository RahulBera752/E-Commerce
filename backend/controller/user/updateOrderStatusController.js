// controllers/updateOrderStatusController.js
import Order from "../../models/orderModel.js";

const updateOrderStatusController = async (req, res) => {
  try {
    // ✅ get orderId from URL param
    const { orderId } = req.params;
    const { status, probableDeliveryDate } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const updateData = { status };

    // Only set probableDeliveryDate if provided AND not delivered
    if (status !== "DELIVERED" && probableDeliveryDate) {
      updateData.probableDeliveryDate = probableDeliveryDate;
    } else if (status === "DELIVERED") {
      updateData.$unset = { probableDeliveryDate: "" }; // remove probableDeliveryDate after delivery
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update order",
    });
  }
};

export default updateOrderStatusController;
