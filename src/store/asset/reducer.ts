import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResponseType } from "interfaces/reponse.interface";
import {
  getListAcquisitionSourceAction,
  getListAssetAction,
  getListAssetCategoryAction,
  getListAssetTypeAction,
} from "./actions";

interface State {
  listAssetPaging: any;
  listAcquisitionSource: any;
  listAssetCategory: any;
  listAssetType: any;
}

const initialState: State = {
  listAssetPaging: {},
  listAcquisitionSource: [],
  listAssetCategory: [],
  listAssetType: [],
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
  },
});

export const {} = assetSlice.actions;
export default assetSlice.reducer;
