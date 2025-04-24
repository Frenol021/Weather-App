// This file contains the functions to fetch weather data from the API
// and the types for the weather data and forecast.
"use client";

import React, { createContext, useState, useContext, } from "react";
import type { WeatherData } from "./WeatherApi";
import { WeatherForecast } from "./WeatherApi";

{/* This file contains the WeatherContext, which provides weather data and unit conversion functionality to the rest of the application. */}
type WeatherContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  weatherForecast: WeatherForecast[] | null;
  setWeatherForecast: (data: WeatherForecast[] | null) => void;
  unit: "celsius" | "fahrenheit";
  toggleUnit: () => void;
};



const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[] | null>(null);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  };

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, weatherForecast, setWeatherForecast, unit, toggleUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};


export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeather must be used within a WeatherProvider");
  return context;
};



