// backend/controller/product/addProduct.js

import productModel from "../../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice
    } = req.body;

    // ✅ Validation: All fields required
    if (
      !productName ||
      !brandName ||
      !category ||
      !Array.isArray(productImage) ||
      productImage.length === 0 ||
      !description ||
      typeof price === 'undefined' ||
      typeof sellingPrice === 'undefined'
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: true
      });
    }

    // ✅ Create new product
    const newProduct = await productModel.create({
      productName,
      brandName,
      category,
      productImage,
      description,
      price: Number(price),
      sellingPrice: Number(sellingPrice)
    });

    res.status(201).json({
      message: "Product uploaded successfully",
      data: newProduct,
      success: true,
      error: false
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      message: err.message || "Server Error",
      error: true,
      success: false
    });
  }
};

export default addProduct;
