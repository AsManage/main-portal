import { createSlice } from "@reduxjs/toolkit";

interface State {
  isOpenMenu: boolean;
}

const initialState: State = {
  isOpenMenu: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isOpenMenu = !state.isOpenMenu;
    },
  },
});

export const { toggleMenu } = commonSlice.actions;
export default commonSlice.reducer;
