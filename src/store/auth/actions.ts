import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginReq } from "interfaces/auth.interface";
import { login } from "services/auth.service";

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (payload: LoginReq) => {
    const response = await login(payload);

    return response.data;
  }
);
