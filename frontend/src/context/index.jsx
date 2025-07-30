import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { SummaryApi } from "../common";
import { setCartCount } from "../store/cartSlice"; // ✅ Redux action

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [userAddToCart, setUserAddToCart] = useState([]);
  const [cartProductCount, setCartProductCount] = useState(0);
  const dispatch = useDispatch(); // ✅ Redux dispatcher

  // ✅ Updated to use correct API: view-cart-product
  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartViewProduct.url, {
        method: SummaryApi.addToCartViewProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

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
