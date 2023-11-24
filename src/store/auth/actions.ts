import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginReq } from "interfaces/auth.interface";
import { login } from "services/auth.service";

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (payload: { params: LoginReq; callback?: () => void }) => {
    const response = await login(payload.params);

    if (response.data.isSuccess) {
      payload.callback && payload.callback();
    }

    return response.data;
  }
);
