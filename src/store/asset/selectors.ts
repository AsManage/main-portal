// import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "store/store";

export const assetProvince = (state: AppState) => state.asset;

export const assetSelector = createSelector(assetProvince, (state) => state);
