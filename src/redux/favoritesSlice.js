import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = { cities: loadFavorites() };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      if (!state.cities.includes(city)) {
        state.cities.push(city);
        localStorage.setItem("favorites", JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter((c) => c !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.cities));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
