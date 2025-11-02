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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">🌦 Weather Dashboard</h1>
        <div className="flex items-center gap-4">
          <SettingsToggle />
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(currentByCity).map(([city, data]) => (
          <CityCard key={city} city={city} data={data} />
        ))}
      </div>

      <FavoritesPanel />

      {/* modal */}
      {selectedCity && <CityDetails />}
    </div>
  );
}
