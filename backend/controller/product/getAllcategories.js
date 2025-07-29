import productModel from "../../models/productModel.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await productModel.distinct("category");

    res.json({
      success: true,
      message: "Fetched all categories",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message,
    });
  }
};

export default getAllCategories;
