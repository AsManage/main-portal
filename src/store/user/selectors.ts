// import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "store/store";

export const userProvince = (state: AppState) => state.user;

export const userSelector = createSelector(userProvince, (state) => state);
