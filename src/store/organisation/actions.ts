import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListOUnitType,
  getOrganisationStructural,
  getTenantInfo,
} from "services/organisation.service";

export const getTenantInfoAction = createAsyncThunk(
  "auth/getTenantInfoAction",
  async () => {
    const response = await getTenantInfo();

    return response.data;
  }
);

export const getListOUnitTypeAction = createAsyncThunk(
  "auth/getListOUnitTypeAction",
  async (payload: { limit: number; page: number }) => {
    const response = await getListOUnitType(payload);

    return response.data;
  }
);

export const getStructuralOUAction = createAsyncThunk(
  "auth/getStructuralOUAction",
  async () => {
    const response = await getOrganisationStructural();
    console.log(response.data);
    return response.data;
  }
);
