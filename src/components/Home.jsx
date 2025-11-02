import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";
import { addFavorite } from "../redux/favoritesSlice";

const Home = ({ onGoToDashboard }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const { data, status, error } = useSelector((state) => state.weather);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      await dispatch(fetchWeather(city.trim()));
    }
  };

  const handleAddFavorite = () => {
    if (data?.location?.name) {
      dispatch(addFavorite(data.location.name));
      alert(`${data.location.name} added to favorites ✅`);
      setCity("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🌍 Weather Dashboard
        </h1>
        <p className="text-xl text-slate-300 font-medium">
          Get real-time weather data for any city worldwide
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-12"
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-6 py-4 w-full rounded-xl text-gray-900 bg-white/95 backdrop-blur outline-none focus:ring-4 focus:ring-blue-500/50 font-medium text-lg shadow-xl transition-all"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl disabled:cursor-not-allowed"
        >
          {status === "loading" ? "🔄 Searching..." : "🔍 Search"}
        </button>
      </form>

      {/* Loading State */}
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-300 font-medium">Fetching weather data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 backdrop-blur rounded-xl p-6 max-w-md text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-red-300 font-medium">Error: {error}</p>
        </div>
      )}

      {/* Weather Result Card */}
      {data?.location && (
        <div className="bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border border-slate-700/50 animate-slide-up">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {data.location.name}
          </h2>
          
          <div className="flex flex-col items-center gap-4 mb-6">
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="w-24 h-24 drop-shadow-2xl"
            />
            <p className="text-6xl font-extrabold">{data.current.temp_c}°C</p>
            <p className="text-xl text-slate-300 font-medium px-4 py-2 bg-slate-700/50 rounded-lg">
              {data.current.condition.text}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-slate-700/50">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">💧</span>
              <span className="text-xs text-slate-400 font-medium">Humidity</span>
              <span className="text-lg font-bold text-blue-400">{data.current.humidity}%</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">🌬️</span>
              <span className="text-xs text-slate-400 font-medium">Wind Speed</span>
              <span className="text-lg font-bold text-cyan-400">{data.current.wind_kph} kph</span>
            </div>
          </div>

          <button
            onClick={handleAddFavorite}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            ⭐ Add to Favorites
          </button>
        </div>
      )}

      {/* Dashboard Link */}
      <button
        onClick={onGoToDashboard}
        className="mt-12 text-lg text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 transition-all flex items-center gap-2"
      >
        View My Dashboard <span className="text-2xl">→</span>
      </button>
    </div>
  );
};

export default Home;