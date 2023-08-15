import { createSlice } from "@reduxjs/toolkit";
import {
  getLoggedInUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserPassword,
  userDataUpdate,
} from "./authApiSlice";

// Create authSlice.
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        localStorage.removeItem("user");
        state.user = null;
      })
      .addCase(getLoggedInUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(getLoggedInUserData.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(userDataUpdate.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(userDataUpdate.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

// Export Selector.
export const getAuthUser = (state) => state.auth;

// Export Actions.
export const { setMessageEmpty } = authSlice.actions;

// Export Reducer.
export default authSlice.reducer;
