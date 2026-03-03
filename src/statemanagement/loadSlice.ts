import { createSlice } from "@reduxjs/toolkit";
const initialState = true;

export const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: { loadUnload: (state) => !state },
});

export const { loadUnload } = loadSlice.actions;
export default loadSlice.reducer;
