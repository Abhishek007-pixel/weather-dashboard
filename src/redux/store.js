import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
  },
});
