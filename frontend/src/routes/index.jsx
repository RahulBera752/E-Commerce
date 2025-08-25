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
import MyOrders from "../pages/MyOrders";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import OrderAnalytics from "../pages/OrderAnalytics";



// 🆕 Footer pages
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import FAQ from "../pages/FAQ";
import Payments from "../pages/Payments";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfUse from "../pages/TermsOfUse";
import CancellationReturns from "../pages/CancellationReturns";
import BecomeSeller from "../pages/BecomeSeller";
import GiftCard from "../pages/GiftCard";
import Advertise from "../pages/Advertise";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          { path: "all-users", element: <AllUsers /> },
          { path: "all-products", element: <AllProducts /> },
          { path: "all-orders", element: <AllOrders /> },
          { path: "order-analytics", element: <OrderAnalytics /> },
        ],
      },
      { path: "product-category/:category", element: <CategoryProduct /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "search", element: <SearchProduct /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <Order /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "account", element: <MyAccount /> },
      { path: "my-orders", element: <MyOrders /> },
      // 🆕 Footer routes
      { path: "about-us", element: <AboutUs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "help-center", element: <ContactUs /> },
      { path: "faq", element: <FAQ /> },
      { path: "payments", element: <Payments /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "terms-of-use", element: <TermsOfUse /> },
      { path: "cancellation-returns", element: <CancellationReturns /> },
      { path: "return-policy", element: <CancellationReturns /> },
      { path: "become-seller", element: <BecomeSeller /> },
      { path: "gift-card", element: <GiftCard /> },
      { path: "advertise", element: <Advertise /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
