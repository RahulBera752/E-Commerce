import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./helpers/scrollTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setCartCount } from "./store/cartSlice";
import { SummaryApi } from "./common";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetails(token);
      fetchCartCount(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      } else {
        // Token invalid or expired
        dispatch(setUserDetails(null));
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(setUserDetails(null));
      localStorage.removeItem("token");
      toast.error("Failed to fetch user info. Please log in again.");
    }
  };

  const fetchCartCount = async (token) => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
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
