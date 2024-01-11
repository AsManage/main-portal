import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getListRoleAction,
  getListSystemPermissionAction,
  getListUserAction,
  getListUserOptionAction,
  getUserDetailAction,
} from "./actions";
import { ResponseType } from "interfaces/reponse.interface";

interface State {
  listPermission: any;
  listRole: any;
  listUserPaging: any;
  listUserOption: any;
  userDetail: any;
}

const initialState: State = {
  listPermission: [],
  listRole: [],
  listUserOption: [],
  listUserPaging: {},
  userDetail: {},
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
        if (action.payload?.isSuccess)
          state.listUserPaging = action.payload.result;
      }
    );
    builder.addCase(
      getUserDetailAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess) state.userDetail = action.payload.result;
      }
    );
    builder.addCase(
      getListUserOptionAction.fulfilled,
      (state, action: PayloadAction<ResponseType>) => {
        if (action.payload?.isSuccess)
          state.listUserOption = action.payload.result;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
