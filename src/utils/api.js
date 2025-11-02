import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherData = async (city) => {
  const res = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${c0ba88c479c1401b94f92206250111}&q=${encodeURIComponent(
      city
    )}&days=7&aqi=no&alerts=no`
  );
  return res.data;
};
