import { AlertStatus, createStandaloneToast } from "@chakra-ui/react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isOpenMenu: boolean;
  closedList: string[];
  isLoading: boolean;
}

interface IToast {
  title?: string;
  message?: string;
  status?: AlertStatus;
}

const { toast } = createStandaloneToast();

const initialState: State = {
  isOpenMenu: false,
  isLoading: false,
  closedList: [],
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state: State, action) => {
      state.isLoading = action.payload;
    },
    toggleMenu(state) {
      state.isOpenMenu = !state.isOpenMenu;
    },
    showToast(_state, action: PayloadAction<IToast>) {
      if (action.payload.message)
        toast({
          title: action.payload.title,
          description: action.payload.message,
          status: action.payload.status || "info",
          duration: 2000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
    },
    setClosedList(state, action) {
      state.closedList = action.payload;
    },
  },
});

export const { toggleMenu, setLoading, showToast, setClosedList } =
  commonSlice.actions;
export default commonSlice.reducer;
