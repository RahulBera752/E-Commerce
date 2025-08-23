import express from "express";
import getAllUsersController from "../controller/user/allUser.js";
import changeUserRole from "../controller/user/changeUserRole.js";
import userDetailsController from "../controller/user/userDetails.js";
import userLogoutController from "../controller/user/userLogout.js";
import userSignInController from "../controller/user/userSignin.js";
import userSignUpController from "../controller/user/userSignup.js";
import authToken from "../middleware/authToken.js";
import placeOrderController from "../controller/user/placeOrder.js";
import orderController from "../controller/user/getMyOrdersController.js";
import getallOrdersController from "../controller/user/getAllOrdersController.js";
import updateOrderStatusController from "../controller/user/updateOrderStatusController.js";
import getAddresses from "../controller/user/getAddresses.js";
import addAddress from "../controller/user/addAddress.js";
import setDefaultAddress from "../controller/user/setDefaultAddress.js";
import { forgotPasswordController } from "../controller/user/forgetPassword.js";
import { resetPasswordController } from "../controller/user/resetPassword.js";

// Product Controllers
import addProduct from "../controller/product/addProduct.js";
import getCategoryProduct from "../controller/product/getCategoryProductOne.js";
import getCategoryWiseProduct from "../controller/product/getCategorywiseProduct.js";
import getAllProducts from "../controller/product/getProduct.js";
import updateProduct from "../controller/product/updateProduct.js";

// Cart Controllers
import searchProduct from "../controller/product/searchProduct.js";
import addToCart from "../controller/user/addToCartController.js";
import addToCartViewProduct from "../controller/user/addtoCartviewProduct.js";
import countAddToCartProduct from "../controller/user/countAddToCartproduct.js";
import deleteCartProduct from "../controller/user/deleteCartProduct.js";
import updateAddToCartProduct from "../controller/user/updateAddToCARTProduct.js";

// Razorpay Payment Controller
import { razorpayOrderController } from "../controller/payment/razorpayOrderController.js";

const router = express.Router();

// 🟢 Forgot / Reset Password Routes
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

// User Routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", authToken, userLogoutController);
router.get("/all-users", authToken, getAllUsersController);
router.patch("/change-role", authToken, changeUserRole);
router.get("/all-orders", authToken, getallOrdersController);
router.patch("/update-order-status/:orderId", updateOrderStatusController);

// Address Book
router.get("/addresses", authToken, getAddresses);
router.post("/address", authToken, addAddress);
router.patch("/address/default/:id", authToken, setDefaultAddress);

// Product Routes
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/add-product", authToken, addProduct);
router.get("/all-products", authToken, getAllProducts);
router.put("/update-product/:id", authToken, updateProduct);
router.get("/product/get-categoryProduct", getCategoryWiseProduct);
router.get("/search", searchProduct);

// Cart Routes
router.post("/addtocart", authToken, addToCart);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.patch("/update-cart-product", authToken, updateAddToCartProduct);
router.delete("/delete-cart-product", authToken, deleteCartProduct);

// Order Routes
router.post("/place-order", authToken, placeOrderController);
router.get("/my-orders", authToken, orderController.getMyOrdersController);
router.patch("/cancel-order", authToken, orderController.cancelOrderController);

// Razorpay Route
router.post("/create-order", authToken, razorpayOrderController);

export default router;
