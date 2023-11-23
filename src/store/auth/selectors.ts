// import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "store/store";

export const authProvince = (state: AppState) => state.auth;

export const authSelector = createSelector(authProvince, (state) => state);
