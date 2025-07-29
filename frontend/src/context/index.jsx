// src/context/index.jsx
import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { SummaryApi } from "../common";
import { setCartCount } from "../store/cartSlice"; // ✅ Import action

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [userAddToCart, setUserAddToCart] = useState([]);
  const [cartProductCount, setCartProductCount] = useState(0);

  const dispatch = useDispatch(); // ✅ Use Redux dispatcher

  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success) {
        const count = data.data?.count || 0;
        setCartProductCount(count);
        dispatch(setCartCount(count)); // ✅ Update Redux
      }
    } catch (err) {
      console.error("fetchUserAddToCart failed:", err);
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
