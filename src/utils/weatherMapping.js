export const weatherCodeMapping = {
  0: { desc: "Clear sky", icon: "☀️", tempColor: "text-yellow-600" },
  1: { desc: "Mainly clear", icon: "🌤️", tempColor: "text-yellow-500" },
  2: { desc: "Partly cloudy", icon: "⛅", tempColor: "text-gray-600" },
  3: { desc: "Overcast", icon: "☁️", tempColor: "text-gray-700" },
  45: { desc: "Fog", icon: "🌫️", tempColor: "text-gray-500" },
  48: { desc: "Depositing rime fog", icon: "🌫️", tempColor: "text-gray-500" },
  51: { desc: "Drizzle", icon: "🌦️", tempColor: "text-blue-500" },
  61: { desc: "Rain: Slight", icon: "🌧️", tempColor: "text-blue-600" },
  65: { desc: "Rain: Heavy", icon: "⛈️", tempColor: "text-gray-800" },
  71: { desc: "Snow fall", icon: "🌨️", tempColor: "text-gray-400" },
  95: { desc: "Thunderstorm", icon: "⛈️", tempColor: "text-gray-800" },
};

export const weatherBgMapping = {
  0: "url('/images/clear-sky.jpg')",
  1: "url('/images/mainly-clear.jpg')",
  2: "url('/images/partly-cloudy.jpg')",
  3: "url('/images/overcast.jpg')",
  45: "url('/images/fog.jpg')",
  48: "url('/images/fog.jpg')",
  51: "url('/images/drizzle.jpg')",
  61: "url('/images/rain.jpg')",
  65: "url('/images/heavy-rain.jpg')",
  71: "url('/images/snow.jpg')",
  95: "url('/images/thunderstorm.jpg')",
};
