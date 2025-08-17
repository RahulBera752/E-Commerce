import Order from "../../models/orderModel.js";

const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", data: updatedOrder });
  } catch (err) {
    console.error("Update Order Status Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default updateOrderStatusController;
