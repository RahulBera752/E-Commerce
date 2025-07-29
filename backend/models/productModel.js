

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brandName: { type: String, required: true },
  category: { type: String, required: true },
  productImage: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one product image is required'
    }
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sellingPrice: { type: Number, required: true }
}, {
  timestamps: true
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
