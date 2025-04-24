"use client";

import { useWeather } from "./WeatherContext";

{/* This component is a sidebar that displays the current weather icon, temperature, description, date, and location. */}
export default function Sidebar() {
  const { weatherData, unit } = useWeather();

  if (!weatherData) {
    return <p className="p-4">Search for a city to see weather info.</p>;
  }
  const convertTemp = (tempC: number) => {
    return unit === "celsius" ? `${tempC}°C` : `${Math.round((tempC * 9) / 5 + 32)}°F`;
  };

  return (
<div className="sidebar p-4  bg-cyan-400 rounded-xl shadow-sm">
  <div className="card  bg-orange-400 rounded-xl shadow-sm">
    <div className="card-body">
      <h2 className="card-title text-xl mb-4">Current Weather</h2>
      
      <div className="flex justify-center mb-4">
        {/* Placeholder for weather icon */}
        <div className="w-30 h-30 bg-slate-900 rounded-full flex items-center justify-center">
           {/*eslint-disable-next-line @next/next/no-img-element */} 
          <span>                          <img
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                  alt={weatherData.description}
                  className="mx-auto w-12 h-12"
                />
            </span>
                         

        </div>
      </div>

      <p className="text-4xl font-bold text-center mb-2">{convertTemp(weatherData.temperature)}</p>
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