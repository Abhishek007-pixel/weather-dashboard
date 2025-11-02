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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white px-4">
      <h1 className="text-5xl font-bold mb-8">🌍 Weather Dashboard</h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8"
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-3 w-full rounded-lg text-gray-900 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all"
        >
          Search
        </button>
      </form>

      {status === "loading" && <p>🔄 Fetching data...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {data?.location && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-80 text-center">
          <h2 className="text-2xl font-bold mb-2">{data.location.name}</h2>
          <p className="text-4xl font-semibold mb-2">{data.current.temp_c}°C</p>
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
            className="mx-auto"
          />
          <p>{data.current.condition.text}</p>
          <p className="text-sm text-gray-400 mt-1">
            Humidity: {data.current.humidity}% | Wind: {data.current.wind_kph} kph
          </p>

          <button
            onClick={handleAddFavorite}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold mt-4"
          >
            ⭐ Add to Favorites
          </button>
        </div>
      )}

      <button
        onClick={onGoToDashboard}
        className="mt-10 text-blue-400 hover:text-blue-500 underline"
      >
        View My Dashboard →
      </button>
    </div>
  );
};

export default Home;
