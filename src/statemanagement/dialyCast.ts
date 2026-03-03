import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DayTemperature = {
    dayName: string;
    hot: number;
    cold: number;
    forcast: string;
}
type DailyForecastState = {values: DayTemperature[];}

const initialState: DailyForecastState = {values: [
    {dayName: "Tuesday", hot: 68, cold: 57, forcast: "/images/icon-partly-cloudy.webp"},
    {dayName: "Wednesday", hot: 70, cold: 59, forcast: "/images/icon-partly-cloudy.webp"},
    {dayName: "Thursday", hot: 75, cold: 57, forcast: "/images/icon-partly-cloudy.webp"},
    {dayName: "Friday", hot: 77, cold: 55, forcast: "/images/icon-partly-cloudy.webp"},
    {dayName: "Saturday", hot: 70, cold: 59, forcast: "/images/icon-partly-cloudy.webp"},
    {dayName: "Sunday", hot: 77, cold: 61, forcast: "/images/icon-partly-cloudy.webp"},
    {dayName: "Monday", hot: 75, cold: 49, forcast: "/images/icon-partly-cloudy.webp"},
]}

const dailyForcastlice = createSlice({
    name: "temperature",
    initialState,
    reducers: {
    addDailyForcast: (state, action: PayloadAction<DayTemperature>) => {state.values.push(action.payload);},
    clearValues: (state) => {state.values = [];},
    }
})

export const { clearValues, addDailyForcast } = dailyForcastlice.actions;
export default dailyForcastlice.reducer;