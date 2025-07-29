import addToCartModel from "../../models/cartProduct.js";

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    const allProduct = await addToCartModel.find({ userId: currentUser })
      .populate({
        path: "productId",
        select: "productName sellingPrice productImage category", // Only send necessary fields
      });

    res.json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default addToCartViewProduct;
