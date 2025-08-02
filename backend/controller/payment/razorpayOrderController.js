import Razorpay from "razorpay";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const razorpayOrderController = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees from frontend

    console.log("🔵 Received amount in ₹ (rupees):", amount);
    console.log("🟡 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log("🟡 RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Exists" : "Missing");

    // Validate amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    // Convert rupees to paise
    const amountInPaise = Math.round(amount * 100); // Razorpay needs paise

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    console.log("🟣 Creating Razorpay order with:", options);

    // Create order
    const order = await instance.orders.create(options);

    console.log("🟢 Razorpay order created:", order);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("❌ Razorpay order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message || "Unknown error occurred",
    });
  }
};

