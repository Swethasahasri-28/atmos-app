import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { MapPin } from "lucide-react";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { weatherBgMapping } from "./utils/weatherMapping";



export default function App() {
  const [query, setQuery] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setCitiesList([]);
      return;
    }
    const timer = setTimeout(() => fetchCities(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchCities = async (name) => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}`
      );
      const data = await res.json();
      if (data.results && data.results.length) setCitiesList(data.results);
      else setCitiesList([]);
    } catch {
      setCitiesList([]);
    }
  };

  const fetchWeather = async (city) => {
    setSelectedCity(city);
    setWeather(null);
    setForecast([]);
    setLoading(true);
    setCitiesList([]);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,uv_index_max&timezone=auto`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather({
        ...data.current_weather,
        city: city.name,
        time: data.current_weather.time,
      });

      const days = data.daily.time.slice(0, 3).map((d, i) => ({
        date: d,
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        code: data.daily.weathercode[i],
        sunrise: data.daily.sunrise[i],
        sunset: data.daily.sunset[i],
        uv: data.daily.uv_index_max[i],
      }));
      setForecast(days);
    } catch {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!citiesList.length) return;
    if (e.key === "ArrowDown")
      setHighlightedIndex((prev) => (prev + 1) % citiesList.length);
    else if (e.key === "ArrowUp")
      setHighlightedIndex((prev) => (prev - 1 + citiesList.length) % citiesList.length);
    else if (e.key === "Enter" && highlightedIndex >= 0)
      fetchWeather(citiesList[highlightedIndex]);
  };

  const clearInput = () => {
    setQuery("");
    setCitiesList([]);
    inputRef.current.focus();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchWeather({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          name: "Current Location",
        }),
      () => { }
    );
  }, []);

  const convertTemp = (temp) => (unit === "C" ? temp : (temp * 9) / 5 + 32);


  useEffect(() => {
    document.title = "Atmos";
  }, []);


  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-3 transition-all duration-500 bg-cover bg-center relative overflow-y-auto"
      style={{
        backgroundImage: weatherBgMapping[weather?.weathercode]
          ? weatherBgMapping[weather.weathercode]
          : "url('/images/none.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-screen-lg flex flex-col items-center mt-4">
        <h1
          className="block md:hidden 
                    text-3xl sm:text-4xl font-medium text-black/60
                    bg-white/10 px-4 py-1 rounded-lg backdrop-blur-sm
                    text-center mb-4"
        >
          Atmos
        </h1>

        <h1
          className="hidden md:block
                    fixed left-8 top-1/2 -rotate-90 origin-left
                    text-3xl lg:text-4xl font-medium text-black/60
                    bg-white/10 px-4 py-1 rounded-lg backdrop-blur-sm
                    z-50
                  "
        >
          Atmos
        </h1>




        <div className="relative w-full max-w-md mb-4">
          <div className="flex items-center justify-center gap-2 w-full max-w-xl">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type city name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 bg-white text-black text-sm sm:text-base pr-8"
                title="Search city"
              />
              {query && (
                <button
                  onClick={clearInput}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button
              onClick={() =>
                navigator.geolocation.getCurrentPosition(
                  (pos) =>
                    fetchWeather({
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude,
                      name: "Your Location",
                    }),
                  () => alert("Unable to fetch location")
                )
              }
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
              title="Use my location"
            >
              <MapPin className="w-5 h-5" />
            </button>

            <button
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="p-2 px-3.5 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center text-sm"
              title="Toggle Celsius/Fahrenheit"
            >
              {unit}
            </button>
          </div>

          {citiesList.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 rounded max-h-52 overflow-y-auto shadow-md bg-white text-black border border-gray-300 text-sm sm:text-base">
              {citiesList.map((c, i) => (
                <li
                  key={c.id}
                  onClick={() => fetchWeather(c)}
                  className={`cursor-pointer p-2 ${i === highlightedIndex ? "bg-blue-500 text-white" : ""
                    }`}
                  title={`Select ${c.name}`}
                >
                  {c.name}, {c.admin1}, {c.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <WeatherCard weather={weather} unit={unit} convertTemp={convertTemp} />
        <ForecastList forecast={forecast} unit={unit} convertTemp={convertTemp} />
      </div>
    </div>
  );
}
