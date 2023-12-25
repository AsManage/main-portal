import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResponseType } from "interfaces/reponse.interface";
import { getListAssetAction } from "./actions";

interface State {
  listAssetPaging: any;
}

const initialState: State = {
  listAssetPaging: {},
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
  },
});

export const {} = assetSlice.actions;
export default assetSlice.reducer;
