import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCity, removeFavorite } from "../redux/weatherSlice";

export default function FavoritesPanel() {
  const favorites = useSelector((s) => s.weather.favorites);
  const dispatch = useDispatch();

  if (!favorites.length) return null;

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-3">
      {favorites.map((city) => (
        <div
          key={city}
          className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-md shadow"
        >
          <button
            onClick={() => dispatch(setSelectedCity(city))}
            className="text-sky-400 hover:text-sky-300 font-medium"
          >
            {city}
          </button>
          <button
            onClick={() => dispatch(removeFavorite(city))}
            className="text-red-400 hover:text-red-300 text-sm"
            title="Remove favorite"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
