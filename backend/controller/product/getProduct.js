import Product from '../../models/productModel.js'; // correct product model

const getProductController = async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 });
    res.json({
      message: "All Products",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};

export default getProductController;

