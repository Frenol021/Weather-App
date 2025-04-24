"use client";

import { useState } from "react";
import { fetchWeather, fetchWeatherForecast } from "./WeatherApi";
import { useWeather } from "./WeatherContext";

export default function Navbar() {
  const [city, setCity] = useState("");
  const { setWeatherData, setWeatherForecast } = useWeather();

  const handleSearch = async () => {
    try {
      const currentWeather = await fetchWeather(city);
      const forecast = await fetchWeatherForecast(city);

      setWeatherData(currentWeather);
      setWeatherForecast(forecast);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      alert("City not found. Please check the spelling and try again.");
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
          GO
        </button>

        {/* Temperature Unit Switcher (optional feature) */}
        <select className="select select-bordered">
          <option value="celsius">°C</option>
          <option value="fahrenheit">°F</option>
        </select>
      </div>
    </div>
  );
}
