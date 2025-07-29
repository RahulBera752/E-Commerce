import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./helpers/scrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setCartCount } from "./store/cartSlice";
import { SummaryApi } from "./common";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        dispatch(setUserDetails(null));
        return;
      }

      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      } else {
        dispatch(setUserDetails(null));
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(setUserDetails(null));
      localStorage.removeItem("token");
    }
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(setCartCount(0));
        return;
      }

      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setCartCount(data.data?.count || 0));
      } else {
        dispatch(setCartCount(0));
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      dispatch(setCartCount(0));
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCartCount();
  }, []);

  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <ScrollToTop />
      <main className="min-h-[calc(100vh-120px)] pt-16 bg-slate-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;