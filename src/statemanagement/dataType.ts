import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = "metric";

const dataTypeSlice = createSlice({
  name: "dataType",
  initialState,
  reducers: {
    setDataType: (_state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setDataType } = dataTypeSlice.actions;
export default dataTypeSlice.reducer;
