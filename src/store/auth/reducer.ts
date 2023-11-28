import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "utils/localStorage";
import { loginAction } from "./actions";
import { ResponseType } from "interfaces/reponse.interface";

interface State {
  data: any;
  emailCached: string;
  resetTokenCached: string;
}

const storage = new LocalStorage();

const initialState: State = {
  data: [],
  emailCached: "",
  resetTokenCached: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      storage.clearStorageItem(storage.availableKey.ACCESS_TOKEN);
      storage.clearStorageItem(storage.availableKey.ACCOUNT_INFO);
      window.location.href = "/auth";
    },
    setEmailCached: (state, action) => {
      state.emailCached = action.payload;
    },
    setResetTokenCached: (state, action) => {
      state.resetTokenCached = action.payload;
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

export const { logout, setEmailCached, setResetTokenCached } =
  authSlice.actions;
export default authSlice.reducer;
