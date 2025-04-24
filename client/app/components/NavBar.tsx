"use client";

import { useState } from "react";
import { fetchWeather, fetchWeatherForecast } from "./WeatherApi";
import { useWeather } from "./WeatherContext";

{/* This component is a navigation bar that allows users to search for a city and toggle between Celsius and Fahrenheit. It uses the useWeather context to manage weather data and unit conversion. */}
export default function Navbar() {
  const [city, setCity] = useState("");
  const { setWeatherData, setWeatherForecast, toggleUnit, unit } = useWeather();

  {/* Function to handle the search button click */}
  const handleSearch = async () => {
    try {
      const currentWeather = await fetchWeather(city);
      const forecast = await fetchWeatherForecast(city);

      setWeatherData(currentWeather);
      setWeatherForecast(forecast);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      alert("City not found. or error fetching the weather data.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl shadow-sm bg-white">
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search city..."
          className="input input-bordered w-48"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>

        {/* Temperature Unit Switcher (optional feature) */}
        <button
          className="btn btn-primary"
          onClick={toggleUnit}
          title="Toggle temperature unit"
        >
          {unit === "celsius" ? "°C" : "°F"}
        </button>
      </div>
    </div>
  );
}
