// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],       // array of cart items
  cartCount: 0         // used in header
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    }
  },
});

// ✅ Selectors to use in OrderPage
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

export const { setCartCount, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
