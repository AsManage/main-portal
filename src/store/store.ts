import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common/reducer";
import authReducer from "./auth/reducer";
import organisationReducer from "./organisation/reducer";
import userReducer from "./user/reducer";
import {} from "store";

import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    organisation: organisationReducer,
    user: userReducer,
  },
});

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  organisation: organisationReducer,
  user: userReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;
export const { dispatch } = store;
