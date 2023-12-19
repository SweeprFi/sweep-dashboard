import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
  sweep: {},
  sweepr: {},
  buyPopup: {
    isOpen: false,
    marketPrice: 0,
    chainId: 0
  },
  bridgePopup: {
    isOpen: false,
    selectedToken: '',
    chainId: 0
  },
};

export const slice = createSlice({
  name: "Sweep",
  initialState,
  reducers: {
    setSweepData: (state, action) => {
      state.sweep = action.payload;
    },
    setSweeprData: (state, action) => {
      state.sweepr = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBuyPopup: (state, action) => {
      state.buyPopup = action.payload;
    },
    setBridgePopup: (state, action) => {
      state.bridgePopup = action.payload;
    },
    // updateSweepData: (state, action) => {
    //   console.log(state, action);
    //   // state.sweep = action.payload;
    // },
  }
});

export const {
  setSweepData,
  setSweeprData,
  setIsLoading,
  setBuyPopup,
  setBridgePopup,
} = slice.actions;

export default slice.reducer;
