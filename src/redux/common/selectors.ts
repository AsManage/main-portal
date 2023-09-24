// import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const commonProvince = (state: RootState) => state.common;

export const commonSelector = createSelector(commonProvince, (state) => state);
