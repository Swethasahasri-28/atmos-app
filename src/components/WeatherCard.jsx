import React from "react";
import { weatherCodeMapping } from "../utils/weatherMapping";

export default function WeatherCard({ weather, unit, convertTemp }) {
  if (!weather) return null;

  return (
    <div className="shadow-md rounded p-4 sm:p-6 w-full max-w-md text-center bg-white/70 backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-2">{weather.city}</h2>
      <div className="text-5xl sm:text-6xl mb-2">
        {weatherCodeMapping[weather.weathercode]?.icon}
      </div>
      <p className="text-lg sm:text-xl mb-1">
        {weatherCodeMapping[weather.weathercode]?.desc}
      </p>
      <p
        className={`text-base sm:text-lg mb-1 ${
          weatherCodeMapping[weather.weathercode]?.tempColor
        }`}
      >
        Temperature: {convertTemp(weather.temperature).toFixed(1)}°{unit}
      </p>
      <p className="text-base sm:text-lg mb-1">
        Wind: {weather.windspeed} km/h
      </p>
      <p className="text-base sm:text-lg mb-1">Time: {weather.time}</p>
    </div>
  );
}
