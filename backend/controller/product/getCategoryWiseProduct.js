import productModel from "../../models/productModel.js";

const getCategoryWiseProduct = async (req, res) => {
  try {
    const products = await productModel.find();

    const categoryMap = new Map();

    for (const product of products) {
      const normalizedCategory = product.category?.trim().toLowerCase();
      if (normalizedCategory && !categoryMap.has(normalizedCategory)) {
        categoryMap.set(normalizedCategory, product);
      }
    }

    const uniqueCategoryProducts = Array.from(categoryMap.values());

    res.status(200).json({
      success: true,
      message: `${uniqueCategoryProducts.length} unique categories found`,
      data: uniqueCategoryProducts,
    });
  } catch (error) {
    console.error("Error in getCategoryWiseProduct:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getCategoryWiseProduct;
