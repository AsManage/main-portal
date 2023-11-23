import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "utils/localStorage";
import { loginAction } from "./actions";
import { ResponseType } from "interfaces/reponse.interface";

interface State {
  data: any;
}

const storage = new LocalStorage();

const initialState: State = {
  data: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      storage.clearStorageItem(storage.availableKey.ACCESS_TOKEN);
      storage.clearStorageItem(storage.availableKey.ACCOUNT_INFO);
      window.location.href = "/login";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginAction.fulfilled,
      (_state, action: PayloadAction<ResponseType>) => {
        storage.setStorageItem(
          storage.availableKey.ACCESS_TOKEN,
          action.payload.result.accessToken
        );
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
