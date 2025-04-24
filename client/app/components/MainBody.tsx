"use client";

import { useWeather } from "./WeatherContext";

export default function MainBody() {
  const { weatherData, weatherForecast } = useWeather();

  if (!weatherData && !weatherForecast) {
    return <p className="p-4">Search for a city to see weather info.</p>;
  }

  return (
    <div className="main-body p-4 col-span-2 grid grid-cols-1 gap-4">

      {/* Next 3 Days Forecast */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-lg mb-4">Next 3 Days</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {weatherForecast?.map((forecast, index) => (
              <div key={index}>
                <p className="font-semibold">{forecast.day}</p>
                {/*eslint-disable-next-line @next/next/no-img-element */} 
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                  alt={forecast.description}
                  className="mx-auto w-12 h-12"
                />
                <p>
                  {Array.isArray(forecast.temperature)
                    ? `${forecast.temperature[0]}°C - ${forecast.temperature[1]}°C`
                    : `${forecast.temperature}°C`}
                </p>
                <p className="capitalize text-gray-600">{forecast.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wind Status */}
      {weatherData && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-lg mb-2">Wind Status</h2>
            <p className="text-3xl font-bold">{weatherData.wind_speed} m/s</p>
            <p className="text-gray-500">{weatherData.wind_deg}° direction</p>
          </div>
        </div>
      )}

      {/* Humidity */}
      {weatherData && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-lg mb-2">Humidity</h2>
            <p className="text-3xl font-bold">{weatherData.humidity}%</p>
            <p className="text-gray-500">Comfortable</p>
          </div>
        </div>
      )}
    </div>
  );
}
