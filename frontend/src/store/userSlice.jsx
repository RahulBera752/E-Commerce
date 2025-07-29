import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      console.log('userdetails', action.payload);
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;
export const getUser = (state) => state.user.user;
export default userSlice.reducer;
