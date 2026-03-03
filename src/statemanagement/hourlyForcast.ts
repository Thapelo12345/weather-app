import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type HourTemperature = {
  time: string;
  weather: {
    temperature: number;
    forcast: string;
  }
};

const initiialState = {
  Tuesday: [] as HourTemperature[],
  Wednesday: [] as HourTemperature[],
  Thursday: [] as HourTemperature[],
  Friday: [] as HourTemperature[],
  Saturday: [] as HourTemperature[],
  Sunday: [] as HourTemperature[],
  Monday: [] as HourTemperature[],
};

const hourlyForcastSlice = createSlice({
    name: "hourlyForcast",
    initialState: initiialState,
    reducers: {
        addTuesdayForcast: (state, action: PayloadAction<HourTemperature>) => {state.Tuesday.push(action.payload);},
        addWednesdayForcast: (state, action: PayloadAction<HourTemperature>) => {state.Wednesday.push(action.payload);},
        addThursdayForcast: (state, action: PayloadAction<HourTemperature>) => {state.Thursday.push(action.payload);},
        addFridayForcast: (state, action: PayloadAction<HourTemperature>) => {state.Friday.push(action.payload);},
        addSaturdayForcast: (state, action: PayloadAction<HourTemperature>) => {state.Saturday.push(action.payload);},
        addSundayForcast: (state, action: PayloadAction<HourTemperature>) => {state.Sunday.push(action.payload);},
        addMondayForcast: (state, action: PayloadAction<HourTemperature>) => {state.Monday.push(action.payload);},

        clearForcast: (state) => {
            state.Tuesday = [];
            state.Wednesday = [];
            state.Thursday = [];
            state.Friday = [];
            state.Saturday = [];
            state.Sunday = [];
            state.Monday = [];
        },
    }
})

export const { addTuesdayForcast, addWednesdayForcast, addThursdayForcast, addFridayForcast, addSaturdayForcast, addSundayForcast, addMondayForcast, clearForcast } = hourlyForcastSlice.actions;
export default hourlyForcastSlice.reducer;
