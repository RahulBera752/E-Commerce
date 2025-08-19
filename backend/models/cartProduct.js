import mongoose from 'mongoose';

const addToCart = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',   // ✅ match the name used in product model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',      // also check if you registered "User" instead of "user"
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("addToCart", addToCart);
export default addToCartModel;
