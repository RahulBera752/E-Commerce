// src/routes/index.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import AllOrders from "../pages/AllOrders";
import CategoryProduct from "../pages/catagoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Order from "../pages/OrderPage";
import OrderSuccess from "../pages/OrderSuccess";
import MyAccount from "../pages/MyAccount";

import MyOrders from "../pages/MyOrders"; // ✅ fixed import

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          { path: "all-users", element: <AllUsers /> },
          { path: "all-products", element: <AllProducts /> },
          { path: "all-orders", element: <AllOrders /> },
        ],
      },
      { path: "product-category/:category", element: <CategoryProduct /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "search", element: <SearchProduct /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <Order /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "account", element: <MyAccount /> },
      { path: "my-orders", element: <MyOrders /> }, // ✅ added
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
