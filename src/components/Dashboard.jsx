import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityBundle } from "../redux/weatherSlice";
import CityCard from "./CityCard";
import SearchBar from "./SearchBar";
import FavoritesPanel from "./FavoritesPanel";
import SettingsToggle from "./SettingsToggle";
import CityDetails from "./CityDetails";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentByCity, favorites, selectedCity } = useSelector((s) => s.weather);

  // initial cities
  useEffect(() => {
    const defaults = favorites.length ? favorites : ["Guwahati", "Moradabad", "Paris", "Kanpur"];
    defaults.forEach((c) => dispatch(fetchCityBundle(c)));
  }, [dispatch, favorites]);

  const handleSearch = (q) => {
    dispatch(fetchCityBundle(q));
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header with glassmorphism */}
      <header className="flex flex-wrap items-center justify-between gap-6 mb-8 bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 shadow-xl">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            🌦 Weather Dashboard
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Track weather conditions across multiple cities
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SettingsToggle />
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Cards grid with animation */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {Object.entries(currentByCity).map(([city, data]) => (
          <CityCard key={city} city={city} data={data} />
        ))}
      </div>

      {/* Empty state */}
      {Object.keys(currentByCity).length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-2xl font-bold mb-2 text-slate-300">No cities added yet</h3>
          <p className="text-slate-400">Search for a city to get started</p>
        </div>
      )}

      <FavoritesPanel />

      {/* modal */}
      {selectedCity && <CityDetails />}
    </div>
  );
}