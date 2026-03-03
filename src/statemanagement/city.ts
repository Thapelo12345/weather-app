import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = "berlin";

const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {setMainCity: (state, action: PayloadAction<string>) => state = action.payload}
})

export const { setMainCity } = citySlice.actions;
export default citySlice.reducer;