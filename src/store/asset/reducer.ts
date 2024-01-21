import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResponseType } from "interfaces/reponse.interface";
import {
  getDetailAssetAction,
  getDetailAuditSessionAction,
  getListAcquisitionSourceAction,
  getListAssetAction,
  getListAssetCategoryAction,
  getListAssetTypeAction,
  getListAuditSessionAction,
} from "./actions";

interface State {
  listAssetPaging: any;
  listAcquisitionSource: any;
  listAssetCategory: any;
  listAssetType: any;
  listAuditSession: any;
  detailAsset: any;
  detailAuditSession: any;
}

const initialState: State = {
  listAssetPaging: {},
  listAcquisitionSource: [],
  listAssetCategory: [],
  listAssetType: [],
  listAuditSession: [],
  detailAsset: {},
  detailAuditSession: {}
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getListAssetAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.listAssetPaging = action.payload.result;
      }
    );
    builder.addCase(
      getListAcquisitionSourceAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.listAcquisitionSource = action.payload.result;
      }
    );
    builder.addCase(
      getListAssetCategoryAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.listAssetCategory = action.payload.result;
      }
    );
    builder.addCase(
      getListAssetTypeAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.listAssetType = action.payload.result;
      }
    );
    builder.addCase(
      getDetailAssetAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.detailAsset = action.payload.result;
      }
    );
    builder.addCase(
      getListAuditSessionAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.listAuditSession = action.payload.result;
      }
    );
    builder.addCase(
      getDetailAuditSessionAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.detailAuditSession = action.payload.result;
      }
    );
  },
});

export const { } = assetSlice.actions;
export default assetSlice.reducer;
