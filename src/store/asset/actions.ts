import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDetailAsset,
  getDetailAuditSession,
  getListAcquisitionSource,
  getListAssetCategory,
  getListAssetPaging,
  getListAssetType,
  getListAuditSession,
} from "services/asset.service";

export const getListAssetAction = createAsyncThunk(
  "asset/getListAssetAction",
  async (payload: {
    limit: number;
    page: number;
    assetTypeId?: string;
    acquisitionSourceId?: string;
  }) => {
    const response = await getListAssetPaging(payload);
    return response.data;
  }
);

export const getDetailAssetAction = createAsyncThunk(
  "asset/getDetailAssetAction",
  async (payload: { assetId: string }) => {
    const response = await getDetailAsset(payload);
    return response.data;
  }
);

export const getListAcquisitionSourceAction = createAsyncThunk(
  "asset/getListAcquisitionSourceAction",
  async () => {
    const response = await getListAcquisitionSource();
    return response.data;
  }
);

export const getListAssetCategoryAction = createAsyncThunk(
  "asset/getListAssetCategoryAction",
  async () => {
    const response = await getListAssetCategory();
    return response.data;
  }
);

export const getListAssetTypeAction = createAsyncThunk(
  "asset/getListAssetTypeAction",
  async (payload: { categoryId: string | number }) => {
    const response = await getListAssetType(payload);
    return response.data;
  }
);

export const getListAuditSessionAction = createAsyncThunk(
  "asset/getListAuditSessionAction",
  async () => {
    const response = await getListAuditSession();
    return response.data;
  }
);

export const getDetailAuditSessionAction = createAsyncThunk(
  "asset/getDetailAuditSessionAction",
  async (sessionId: number) => {
    const response = await getDetailAuditSession(sessionId);
    return response.data;
  }
);