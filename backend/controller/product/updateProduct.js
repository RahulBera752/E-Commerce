// backend/controller/product/updateProduct.js
import productModel from "../../models/productModel.js";

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const updateData = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,           // Return the updated document
        runValidators: true, // Apply schema validators
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export default updateProduct;
