import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { SummaryApi } from "../common";
import { setCartCount } from "../store/cartSlice";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [userAddToCart, setUserAddToCart] = useState([]);
  const [cartProductCount, setCartProductCount] = useState(0);
  const dispatch = useDispatch();

  // ✅ Updated: use JWT token from localStorage
  const fetchUserAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserAddToCart([]);
        setCartProductCount(0);
        dispatch(setCartCount(0));
        return;
      }

      const response = await fetch(SummaryApi.addToCartViewProduct.url, {
        method: SummaryApi.addToCartViewProduct.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ use token
        },
      });

      if (response.status === 401) {
        // Token expired or invalid
        setUserAddToCart([]);
        setCartProductCount(0);
        dispatch(setCartCount(0));
        localStorage.removeItem("token");
        return;
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setUserAddToCart(data.data);
        setCartProductCount(data.data.length);
        dispatch(setCartCount(data.data.length));
      } else {
        setUserAddToCart([]);
        setCartProductCount(0);
        dispatch(setCartCount(0));
      }
    } catch (err) {
      console.error("fetchUserAddToCart failed:", err);
      setUserAddToCart([]);
      setCartProductCount(0);
      dispatch(setCartCount(0));
    }
  };

  return (
    <Context.Provider
      value={{
        userAddToCart,
        setUserAddToCart,
        fetchUserAddToCart,
        cartProductCount,
        setCartProductCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context };
export default ContextProvider;
