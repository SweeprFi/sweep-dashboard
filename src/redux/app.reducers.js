import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  }
});

export const {
  setSweepData,
  setSweeprData,
  setIsLoading,
} = slice.actions;

export default slice.reducer;
