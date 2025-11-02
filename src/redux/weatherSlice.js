import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const TTL_MS = 60 * 1000; // cache 60s

// ---- tiny localStorage cache (per city) ----
const cacheKey = (city) => `wx_${city.toLowerCase()}`;
const loadCache = (city) => {
  try {
    const raw = localStorage.getItem(cacheKey(city));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
};
const saveCache = (city, data) => {
  try {
    localStorage.setItem(
      cacheKey(city),
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {}
};

// ---- thunks ----
export const fetchSuggestions = createAsyncThunk(
  "weather/fetchSuggestions",
  async (query) => {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}`
    );
    return data; // [{name, country, ...}]
  }
);

export const fetchCityBundle = createAsyncThunk(
  "weather/fetchCityBundle",
  async (city) => {
    const cached = loadCache(city);
    if (cached) return { city, payload: cached };

    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        city
      )}&days=7&aqi=no&alerts=no`
    );
    saveCache(city, data);
    return { city, payload: data };
  }
);

// ---- slice ----
const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    // data maps
    currentByCity: {},
    forecastByCity: {},
    locationByCity: {},

    // ui & prefs
    unit: "C",
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
    selectedCity: null,

    // search
    suggestions: [],
    suggStatus: "idle",

    // last loaded bundle
    lastBundle: null,
  },
  reducers: {
    toggleUnit: (s) => {
      s.unit = s.unit === "C" ? "F" : "C";
    },
    addFavorite: (s, { payload }) => {
      if (!s.favorites.includes(payload)) {
        s.favorites.push(payload);
        localStorage.setItem("favorites", JSON.stringify(s.favorites));
      }
    },
    removeFavorite: (s, { payload }) => {
      s.favorites = s.favorites.filter((c) => c !== payload);
      localStorage.setItem("favorites", JSON.stringify(s.favorites));
    },
    setSelectedCity: (s, { payload }) => {
      // payload: city string or null
      s.selectedCity = payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchSuggestions.pending, (s) => {
      s.suggStatus = "loading";
    })
      .addCase(fetchSuggestions.fulfilled, (s, a) => {
        s.suggStatus = "succeeded";
        s.suggestions = a.payload || [];
      })
      .addCase(fetchSuggestions.rejected, (s) => {
        s.suggStatus = "failed";
        s.suggestions = [];
      })
      .addCase(fetchCityBundle.fulfilled, (s, a) => {
        const { city, payload } = a.payload;
        s.lastBundle = payload;
        s.currentByCity[city] = payload.current;
        s.forecastByCity[city] = payload.forecast;
        s.locationByCity[city] = payload.location;
      });
  },
});

export const {
  toggleUnit,
  addFavorite,
  removeFavorite,
  setSelectedCity,
} = weatherSlice.actions;

export default weatherSlice.reducer;
