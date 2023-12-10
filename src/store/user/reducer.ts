import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getListSystemPermissionAction } from "./actions";
import { ResponseType } from "interfaces/reponse.interface";

interface State {
  listPermission: any;
}

const initialState: State = {
  listPermission: [],
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
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
