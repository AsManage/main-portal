// import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "store/store";

export const organisationProvince = (state: AppState) => state.organisation;

export const organisationSelector = createSelector(
  organisationProvince,
  (state) => state
);
