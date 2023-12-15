import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginReq } from "interfaces/auth.interface";
import { login } from "services/auth.service";

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (payload: { params: LoginReq; callback?: () => void }) => {
    const response = await login(payload.params);

    if (response.data.isSuccess) {
      setTimeout(() => {
        payload.callback && payload.callback();
      }, 500);
    }

    return response.data;
  }
);
