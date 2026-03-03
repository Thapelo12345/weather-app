"use client"
import { createContext } from "react";
export type CityAndCountryContextType = {
    load: boolean,
    cityName: string; 
    countryName: string;
    FeelLike: number;
    Humanity:  number;
    WindSpeed: number;
    Precipitation: number;
    HighTemperature: number;
    LowTemperature: number; 
};
export const CityAndCountryContext = createContext<CityAndCountryContextType>({
    load: false,
    cityName: "Berlin", 
    countryName: "Germany",
    FeelLike: 0,
    Humanity: 0,
    WindSpeed: 0,
    Precipitation: 0,
    HighTemperature: 0,
    LowTemperature: 0
});