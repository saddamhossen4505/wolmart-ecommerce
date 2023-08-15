import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// UserRegister.
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/auth/register`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// UserLogin.
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// UserLogout.
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/logout`,
      "",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// GetLoggedInUser.
export const getLoggedInUserData = createAsyncThunk(
  "auth/getLoggedInUserData",
  async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/v1/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// UpdateUserData.
export const userDataUpdate = createAsyncThunk(
  "auth/userDataUpdate",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/auth/update/data/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// UpdateUserPassword.
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async ({ id, data }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/auth/update/password/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
