import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import userReducer from "../features/user/userSlice.js";

// Create store.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  devTools: true,
});
