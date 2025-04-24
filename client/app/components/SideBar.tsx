"use client";

import { useWeather } from "./WeatherContext";

export default function Sidebar() {
  const { weatherData } = useWeather();

  if (!weatherData) {
    return <p className="p-4">Search for a city to see weather info.</p>;
  }

  return (
<div className="sidebar p-4">
  <div className="card">
    <div className="card-body">
      <h2 className="card-title text-xl mb-4">Current Weather</h2>
      
      <div className="flex justify-center mb-4">
        {/* Placeholder for weather icon */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span>{weatherData.icon}</span>
        </div>
      </div>

      <p className="text-4xl font-bold text-center mb-2">{weatherData.temperature}°C</p>
      <p className="text-center text-sm text-gray-500 mb-2">{weatherData.description}</p>

      <div className="text-center text-sm text-gray-500">
        <p>{weatherData.city}</p>
        <p>{weatherData.date}</p>
      </div>
    </div>
  </div>
</div>

  );
}
// This component is a sidebar that displays the current weather icon, temperature, description, date, and location.