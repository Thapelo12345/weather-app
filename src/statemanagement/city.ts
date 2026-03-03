import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = "berlin";

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setMainCity: (_state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setMainCity } = citySlice.actions;
export default citySlice.reducer;
