// backend/routes/productRoutes.js
import express from "express";
import getProductController from "../controller/product/getProduct.js";
import addProduct from "../controller/product/addProduct.js";
import updateProductController from "../controller/product/updateProduct.js";
import authToken from "../middleware/authToken.js";
import getCategoryProduct from "../controller/product/getCategoryProductOne.js";
import getCategoryWiseProduct from "../controller/product/getCategoryWiseProduct.js";
import getAllCategories from "../controller/product/getAllcategories.js";
import searchProduct from "../controller/product/searchProduct.js";
import productModel from "../models/productModel.js";

const router = express.Router();

// ✅ Define static routes before dynamic ones
router.get("/all-products", getProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.get("/get-categoryWiseProduct", getCategoryWiseProduct);
router.get("/all-category", getAllCategories);
router.post("/add-product", addProduct);

// ✅ Corrected to expect URL param :id
router.put("/update-product/:id", authToken, updateProductController);

router.get("/search", searchProduct);

// ⚠️ Dynamic product detail route LAST
router.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json({
      data: product,
      message: "OK",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      success: false,
      error: true,
    });
  }
});

export default router;
