import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginReq } from "interfaces/auth.interface";
import { login } from "services/auth.service";
import { getListPermission } from "services/user.service";

export const getListSystemPermissionAction = createAsyncThunk(
  "auth/getListSystemPermissionAction",
  async () => {
    const response = await getListPermission();

    return response.data;
  }
);
