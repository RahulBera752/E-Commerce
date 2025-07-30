import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // ✅ Must match your user model name exactly
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
          ref: "product", // ✅ fix: lowercase to match your product model
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

// ✅ Fix OverwriteModelError
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
