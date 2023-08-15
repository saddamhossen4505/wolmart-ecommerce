import { createSlice } from "@reduxjs/toolkit";
import {
  createPermission,
  createRole,
  createUser,
  deletePermission,
  deleteRole,
  deleteUser,
  getAllPermission,
  getAllRole,
  getAllUser,
  updatePermission,
  updatePermissionStatus,
  updateRole,
  updateRoleStatus,
  updateUser,
  updateUserStatus,
} from "./userApiSlice";

// Create userSlice.
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    permission: null,
    role: null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.permission.push(action.payload.permission);
        state.message = action.payload.message;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission = state.permission.filter(
          (data) => data._id !== action.payload.permission._id
        );
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission[
          state.permission.findIndex(
            (data) => data._id === action.payload.permissionStatus._id
          )
        ] = action.payload.permissionStatus;
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission[
          state.permission.findIndex(
            (data) => data._id === action.payload.permission._id
          )
        ] = action.payload.permission;
      })
      .addCase(getAllRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRole.fulfilled, (state, action) => {
        state.role = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.role.push(action.payload.role);
        state.message = action.payload.message;
      })
      .addCase(updateRoleStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRoleStatus.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex(
            (data) => data._id === action.payload.roleStatus._id
          )
        ] = action.payload.roleStatus;
        state.message = action.payload.message;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.role = state.role.filter(
          (data) => data._id !== action.payload.role._id
        );
        state.message = action.payload.message;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex(
            (data) => data._id === action.payload.updateRole._id
          )
        ] = action.payload.updateRole;
        state.message = action.payload.message;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.user = state.user ?? [];
        state.user = action.payload.users;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = state.user ?? [];
        state.user.push(action.payload.user);
        state.message = action.payload.message;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex(
            (data) => data._id === action.payload.updateStatus._id
          )
        ] = action.payload.updateStatus;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter(
          (data) => data._id !== action.payload.user._id
        );
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user[
          state.user.findIndex(
            (data) => data._id === action.payload.updateUser._id
          )
        ] = action.payload.updateUser;
        state.message = action.payload.message;
      });
  },
});

// Export Selector.
export const getAllPermissionData = (state) => state.user;

// Export Actions.
export const { setMessageEmpty } = userSlice.actions;

// Export Reducer.
export default userSlice.reducer;
