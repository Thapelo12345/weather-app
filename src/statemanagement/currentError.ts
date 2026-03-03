import { createSlice } from "@reduxjs/toolkit";

const initialState = false


export const errorSlice = createSlice({
  name: "load",
  initialState,
  reducers: { searchError: (state) => !state },
});

export const { searchError } = errorSlice.actions;
export default errorSlice.reducer;
