import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginReq } from "interfaces/auth.interface";
import { login } from "services/auth.service";
import {
  getListPermission,
  getListRole,
  getListUserPaging,
} from "services/user.service";

export const getListSystemPermissionAction = createAsyncThunk(
  "auth/getListSystemPermissionAction",
  async () => {
    const response = await getListPermission();

    return response.data;
  }
);

export const getListRoleAction = createAsyncThunk(
  "auth/getListRoleAction",
  async () => {
    const response = await getListRole();

    return response.data;
  }
);

export const getListUserAction = createAsyncThunk(
  "auth/getListUserAction",
  async (payload: { limit: number; page: number }) => {
    const response = await getListUserPaging(payload);
    return response.data;
  }
);
