// backend/controller/user/deleteCartProduct.js
import addToCartModel from "../../models/cartProduct.js";

const deleteCartProduct = async (req, res) => {
  try {
    const id = req.body._id;

    if (!id) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    const deleted = await addToCartModel.findByIdAndDelete(id);

    res.json({
      message: "Product removed from cart",
      success: true,
      error: false,
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

export default deleteCartProduct;
