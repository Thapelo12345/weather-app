// lib/features/location/locationSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the type for location state
type LOCATION = {
  cityName: string;
  countryName: string;
  Day: string;
  dayDate: number;
  Month: string;
  Year: number;
  weather: {
    temperature: number;
    forcast: string
  };
};

// Initial state
const initialState: LOCATION = {
  cityName: "Berlin",
  countryName: "Germany",
  Day: "Tuesday",
  dayDate: 5,
  Month: "Aug",
  Year: 2005,
  weather: {temperature: 20, forcast: "sunny"},
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.countryName = action.payload;
    },

    setDay: (state, action: PayloadAction<string>) => {
      state.Day = action.payload;
    },

    setDayDate: (state, action: PayloadAction<number>)=> {state.dayDate = action.payload},
    
    setMonth: (state, action: PayloadAction<string>) => {
      state.Month = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.Year = action.payload;
    },
    setWeather: (state, action: PayloadAction<{temperature: number, forcast: string}>) => {
      state.weather = action.payload;
    },
  },
});

// Export actions
export const {
  setCity,
  setCountry,
  setDay,
  setDayDate,
  setMonth,
  setYear,
  setWeather,
} = locationSlice.actions;
export default locationSlice.reducer;
