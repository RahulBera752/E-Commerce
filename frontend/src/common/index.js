// src/common/index.js

const BASE_URL = "http://localhost:8080";

export const SummaryApi = {
  signup: {
    url: `${BASE_URL}/api/user/signup`,
    method: "POST",
  },
  signin: {
    url: `${BASE_URL}/api/user/signin`,
    method: "POST",
  },
  current_user: {
    url: `${BASE_URL}/api/user/user-details`,
    method: "GET",
  },
  logout_user: {
    url: `${BASE_URL}/api/user/userLogout`,
    method: "GET",
  },
  all_users: {
    url: `${BASE_URL}/api/user/all-users`,
    method: "GET",
  },
  change_user_role: {
    url: `${BASE_URL}/api/user/change-role`,
    method: "PATCH",
  },
  forgotPassword: {
  url: `${BASE_URL}/api/user/forgot-password`,
  method: "POST",
},
resetPassword: {
  url: `${BASE_URL}/api/user/reset-password`,
  method: "POST",
},
  // ✅ Product APIs
  all_products: {
    url: `${BASE_URL}/api/product/all-products`,
    method: "GET",
  },
  uploadProduct: {
    url: `${BASE_URL}/api/product/add-product`,
    method: "POST",
  },
  updateProduct: (id) => ({
    url: `${BASE_URL}/api/product/update-product/${id}`,
    method: "PUT",
  }),
  categoryWiseProduct: {
    url: `${BASE_URL}/api/product/get-categoryProduct`,
    method: "GET",
  },
  allCategory: {
    url: `${BASE_URL}/api/product/all-category`,
    method: "GET",
  },
  productDetails: (id) => ({
    url: `${BASE_URL}/api/product/${id}`,
    method: "GET",
  }),

  // ✅ Cart APIs
  addToCartProduct: {
    url: `${BASE_URL}/api/user/addtocart`,
    method: "POST",
  },
  addToCartProductCount: {
    url: `${BASE_URL}/api/user/countAddToCartProduct`,
    method: "GET",
  },
  addToCartViewProduct: {
    url: `${BASE_URL}/api/user/view-cart-product`,
    method: "GET",
  },
  updateCartProduct: {
    url: `${BASE_URL}/api/user/update-cart-product`,
    method: "PATCH",
  },
  deleteCartProduct: {
    url: `${BASE_URL}/api/user/delete-cart-product`,
    method: "DELETE",
  },
  searchProduct: {
    url: `${BASE_URL}/api/product/search`,
    method: "GET",
  },

  // ✅ Order APIs
  order: {
    url: `${BASE_URL}/api/user/place-order`,
    method: "POST",
  },
  allOrders: {
    url: `${BASE_URL}/api/user/all-orders`,
    method: "GET",
  },
  updateOrderStatus: (id) => ({
    url: `${BASE_URL}/api/user/update-order-status/${id}`,
    method: "PATCH",
  }),
  myOrders: {
    url: `${BASE_URL}/api/user/my-orders`,
    method: "GET",
  },
  cancelOrder: {
    url: `${BASE_URL}/api/user/cancel-order`,
    method: "PATCH",
  },

  // ✅ Address APIs
  getAddresses: {
    url: `${BASE_URL}/api/user/addresses`,
    method: "GET",
  },
  addAddress: {
    url: `${BASE_URL}/api/user/address`,
    method: "POST",
  },
  setDefaultAddress: (id) => ({
    url: `${BASE_URL}/api/user/address/default/${id}`,
    method: "PATCH",
  }),
};
