import productModel from "../../models/productModel.js";

const getCategoryProduct = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category parameter is required",
      });
    }

    const products = await productModel.find({
      category: { $regex: new RegExp(`^${category}$`, "i") }
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: `${products.length} product(s) found in ${category}`,
      data: products
    });
  } catch (error) {
    console.error("getCategoryProduct error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getCategoryProduct;
