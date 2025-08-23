import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        productName: String,
        sellingPrice: Number,
        productImage: [String],
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    // ✅ Separate fields for amounts
    grossTotal: {
      type: Number,
      required: true, // total before discount
    },
    discount: {
      type: Number,
      default: 0, // how much was discounted
    },
    finalAmount: {
      type: Number,
      required: true, // total after discount
    },

    // ✅ Coupon details inline
    coupon: {
      code: { type: String, default: null },
      discountType: { type: String, enum: ["PERCENT", "FLAT"], default: null },
      discountValue: { type: Number, default: 0 },
    },

    status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },

    probableDeliveryDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
