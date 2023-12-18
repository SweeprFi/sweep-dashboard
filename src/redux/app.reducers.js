import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  sweep: {},
  sweepr: {},
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
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
  }
});

export const {
  setSweepData,
  setSweeprData,
  setWallet,
} = slice.actions;

export default slice.reducer;
