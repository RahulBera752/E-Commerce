import addToCartModel from "../../models/cartProduct.js";

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    if (!currentUser) {
      return res.status(401).json({
        message: "Unauthorized - please log in",
        success: false,
        error: true,
      });
    }

    const allProduct = await addToCartModel.find({ userId: currentUser })
      .populate({
        path: "productId",
        select: "productName sellingPrice productImage category price",
      });

    return res.status(200).json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

export default addToCartViewProduct;
