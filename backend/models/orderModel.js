import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ must match user model name
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // ✅ must match product model name
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        productName: String,
        sellingPrice: Number,
        productImage: [String],
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD",
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "PLACED",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
