import React from "react";
import { weatherCodeMapping } from "../utils/weatherMapping";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const isToday = (dateStr) => {
  const today = new Date().toISOString().split("T")[0];
  return today === dateStr;
};

const uvLevel = (uv) => {
  if (uv < 3) return { text: "Low", color: "text-green-600" };
  if (uv < 6) return { text: "Moderate", color: "text-yellow-600" };
  if (uv < 8) return { text: "High", color: "text-orange-600" };
  return { text: "Very High", color: "text-red-600" };
};

export default function ForecastList({ forecast, unit, convertTemp }) {
  if (!forecast.length) return null;

  return (
    <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 px-2 sm:px-6">
      {forecast.map((day) => (
        <div
          key={day.date}
          className={`p-3 sm:p-4 rounded shadow-md bg-white/70 backdrop-blur-md flex flex-col justify-between items-center
            ${isToday(day.date) ? "border-2 border-blue-500" : ""}`}
        >
          <div className="text-center text-sm sm:text-base">
            <p className="font-semibold">
              {formatDate(day.date)} {isToday(day.date) && <span className="text-blue-600">(Today)</span>}
            </p>
            <p>{weatherCodeMapping[day.code]?.desc}</p>

            <p>
              <span className="text-red-600 font-medium">
                ↑ {convertTemp(day.max).toFixed(1)}°{unit}
              </span>{" "}
              /{" "}
              <span className="text-blue-600 font-medium">
                ↓ {convertTemp(day.min).toFixed(1)}°{unit}
              </span>
            </p>

            <p className={uvLevel(day.uv).color}>
              UV: {day.uv} ({uvLevel(day.uv).text})
            </p>

            <p>
              Sunrise:{" "}
              {new Date(day.sunrise).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              / Sunset:{" "}
              {new Date(day.sunset).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="text-3xl sm:text-4xl mt-1">
            {weatherCodeMapping[day.code]?.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
