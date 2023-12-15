import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getListRoleAction,
  getListSystemPermissionAction,
  getListUserAction,
} from "./actions";
import { ResponseType } from "interfaces/reponse.interface";

interface State {
  listPermission: any;
  listRole: any;
  listUserPaging: any;
}

const initialState: State = {
  listPermission: [],
  listRole: [],
  listUserPaging: {},
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
    builder.addCase(
      getListUserAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        console.log(action.payload);
        if (action.payload?.isSuccess)
          state.listUserPaging = action.payload.result;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
