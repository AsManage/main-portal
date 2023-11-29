import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTenantInfoAction } from "./actions";
import { ResponseType } from "interfaces/reponse.interface";

interface State {
  tenantInfo: any;
}

const initialState: State = {
  tenantInfo: {},
};

const organisationSlice = createSlice({
  name: "organisation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTenantInfoAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        state.tenantInfo = action.payload?.result;
      }
    );
  },
});

export const {} = organisationSlice.actions;
export default organisationSlice.reducer;
