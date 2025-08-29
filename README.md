# Atmos 🌤️

**Atmos** is a simple, responsive weather application built with **React** and **Tailwind CSS**. It allows users to quickly check current weather conditions and a 3-day forecast for any city or their current location.

---

## **Features**

- Search for any city and get current weather information.
- Automatically fetch weather for your current location using geolocation.
- View:
  - Temperature (Celsius/Fahrenheit toggle)
  - Weather description and icon
  - Wind speed
  - Local time
  - 3-day forecast including max/min temperature, UV index, sunrise/sunset
- Dynamic background images based on weather conditions.
- Keyboard navigation for search suggestions.
- Mobile and desktop responsive.
- Smooth loading indicators and graceful error handling.

---

## **Live Demo**

The app is hosted on CodeSandbox: [Atmos Weather App](https://m96v78-3000.csb.app/)

---

## **Getting Started**

### **Prerequisites**

- Node.js (v16 or higher recommended)
- npm or yarn

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/Swethasahasri-28/atmos-app.git

   ```

2. Install dependencies:

   ```bash
    npm install
    # or
    yarn install

   ```

3. Start the development server::

   ```bash
    npm start
    # or
    yarn start

   ```

4. Open your browser at http://localhost:3000 to see the app running.

## **Usage**

- Type the name of a city in the search box.
- Click on a suggested city or press **Enter** to fetch weather.
- Click the location button to fetch weather for your current location.
- Toggle between Celsius and Fahrenheit using the unit button.

---

## **Technologies Used**

- **React** – Frontend framework
- **Tailwind CSS** – Styling and responsive design
- **Open-Meteo API** – Weather data
- **Lucide React** – Icons

---

## **Weather API**

- **Geocoding API:**  
  `https://geocoding-api.open-meteo.com/v1/search?name={city_name}`

- **Current & Forecast Weather:**  
  `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,uv_index_max&timezone=auto`

No authentication is required.

---

## **Error Handling**

- Alerts user if weather data cannot be fetched.
- Displays empty suggestion list if no cities are found.
- Loading spinner while fetching data.