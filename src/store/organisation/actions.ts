import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTenantInfo } from "services/organisation.service";

export const getTenantInfoAction = createAsyncThunk(
  "auth/getTenantInfoAction",
  async () => {
    const response = await getTenantInfo();

    return response.data;
  }
);
