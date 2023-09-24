import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common/reducer";

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<any>;
