import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addLocation,
  addOUnit,
  getListOUnitType,
  getLocationStructural,
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

export const getAllListOUnitTypeAction = createAsyncThunk(
  "auth/getAllListOUnitTypeAction",
  async () => {
    const response = await getListOUnitType({ page: 1 });

    return response.data;
  }
);

export const getStructuralOUAction = createAsyncThunk(
  "auth/getStructuralOUAction",
  async () => {
    const response = await getOrganisationStructural();
    return response.data;
  }
);

export const addOUAction = createAsyncThunk(
  "auth/addOUAction",
  async (payload: any) => {
    const response = await addOUnit(payload);
    if (response.data.isSuccess) {
      payload?.callback && payload?.callback();
    }
    return response.data;
  }
);

export const getStructuralLocationAction = createAsyncThunk(
  "auth/getStructuralLocationAction",
  async () => {
    const response = await getLocationStructural();
    return response.data;
  }
);

export const addLocationAction = createAsyncThunk(
  "auth/addLocationAction",
  async (payload: any) => {
    const response = await addLocation(payload);
    if (response.data.isSuccess) {
      payload?.callback && payload?.callback();
    }
    return response.data;
  }
);
