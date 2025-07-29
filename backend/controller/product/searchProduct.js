import productModel from "../../models/productModel.js";

const searchProduct = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Missing search query",
        error: true,
      });
    }

    const regex = new RegExp(query, "i"); // ✅ lowercase 'i' for case-insensitive

    const products = await productModel.find({
      $or: [
        { productName: regex },
        { category: regex },
        { brandName: regex },
        { description: regex },
      ],
    });

    res.json({
      data: products,
      message: "Search Product list",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default searchProduct;
