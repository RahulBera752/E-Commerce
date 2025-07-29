import mongoose from 'mongoose';

const addToCart = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

const addToCartModel = mongoose.model("addToCart", addToCart);
export default addToCartModel;
