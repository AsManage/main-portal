// import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "store/store";

export const commonProvince = (state: AppState) => state.common;

export const commonSelector = createSelector(commonProvince, (state) => state);
