import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getListRoleAction, getListSystemPermissionAction } from "./actions";
import { ResponseType } from "interfaces/reponse.interface";

interface State {
  listPermission: any;
  listRole: any;
}

const initialState: State = {
  listPermission: [],
  listRole: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getListSystemPermissionAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.listPermission = action.payload.result;
      }
    );
    builder.addCase(
      getListRoleAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess) state.listRole = action.payload.result;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
