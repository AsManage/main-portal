import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addLocationAction,
  addOUAction,
  getAllListOUnitTypeAction,
  getListOUnitTypeAction,
  getStructuralLocationAction,
  getStructuralOUAction,
  getTenantInfoAction,
} from "./actions";
import { ResponseType } from "interfaces/reponse.interface";
import { LIMIT_LIST } from "constants/common";

interface State {
  tenantInfo: any;
  listOUType: any;
  structuralOU: any;
  structuralLocation: any;
  totalOUType: number;
  limitOUType: number;
  currentPageOUType: number;
}

const initialState: State = {
  tenantInfo: {},
  listOUType: [],
  structuralOU: [],
  structuralLocation: [],
  totalOUType: 0,
  limitOUType: LIMIT_LIST[1],
  currentPageOUType: 1,
};

const organisationSlice = createSlice({
  name: "organisation",
  initialState,
  reducers: {
    setCurrentPageOUType: (state, action) => {
      state.currentPageOUType = action.payload;
    },
    setLimitOUType: (state, action) => {
      state.limitOUType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTenantInfoAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        state.tenantInfo = action.payload?.result;
      }
    );
    builder.addCase(
      getListOUnitTypeAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        state.listOUType = action.payload.result;
        state.totalOUType = action.payload.total || 0;
      }
    );
    builder.addCase(
      getStructuralOUAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        state.structuralOU = action.payload.result;
      }
    );
    builder.addCase(
      getAllListOUnitTypeAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        state.listOUType = action.payload.result;
      }
    );
    builder.addCase(
      addOUAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.structuralOU = action.payload.result;
      }
    );
    builder.addCase(
      getStructuralLocationAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.structuralLocation = action.payload.result;
      }
    );
    builder.addCase(
      addLocationAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.structuralLocation = action.payload.result;
      }
    );
  },
});

export const { setCurrentPageOUType, setLimitOUType } =
  organisationSlice.actions;
export default organisationSlice.reducer;
