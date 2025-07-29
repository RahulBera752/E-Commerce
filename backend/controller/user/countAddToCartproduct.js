import addToCartModel from "../../models/cartProduct.js";

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
        error: true,
        success: false,
      });
    }

    const count = await addToCartModel.countDocuments({ userId });

    res.json({
      data: { count },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default countAddToCartProduct;
