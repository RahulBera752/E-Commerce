import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice"; // ✅ Import it here

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice, // ✅ Register reducer
  },
});
