// app/context/WeatherContext.tsx
"use client";

import React, { createContext, useState, useContext } from "react";
import type { WeatherData } from "./WeatherApi";
import { WeatherForecast } from "./WeatherApi";


type WeatherContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  weatherForecast: WeatherForecast[] | null;
  setWeatherForecast: (data: WeatherForecast[] | null) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[] | null>(null);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, weatherForecast, setWeatherForecast }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeather must be used within a WeatherProvider");
  return context;
};


// (Removed duplicate definition of WeatherContextType and related code)
