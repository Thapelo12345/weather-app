import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type WINDSPEED = {
    FeelsLike: number;
    Humanity: number;
    windSpeed: number;
    Precipitation: number;
}

const intialState: WINDSPEED = {
    FeelsLike: 64,
    Humanity: 46,
    windSpeed: 9.5,
    Precipitation: 30,
}

const windSpeedSlice = createSlice({
    name: "windSpeed",
    initialState: intialState,
    reducers: {
        setFeelsLike: (state, action:PayloadAction<number>) => {state.FeelsLike = action.payload;},     
        setHumanity: (state, action:PayloadAction<number>) => {state.Humanity = action.payload;},
        setWindSpeed: (state, action:PayloadAction<number>) => {state.windSpeed = action.payload;},
        setPrecipitation: (state, action:PayloadAction<number>) => {state.Precipitation = action.payload;},
    }
})

export const { setFeelsLike, setHumanity, setWindSpeed, setPrecipitation } = windSpeedSlice.actions;
export default windSpeedSlice.reducer;