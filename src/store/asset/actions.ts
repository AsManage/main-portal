import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListAssetPaging } from "services/asset.service";

export const getListAssetAction = createAsyncThunk(
  "asset/getListAssetAction",
  async (payload: { limit: number; page: number }) => {
    const response = await getListAssetPaging(payload);
    return response.data;
  }
);
