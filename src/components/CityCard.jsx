import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityBundle, setSelectedCity } from "../redux/weatherSlice";

export default function CityCard({ city, data }) {
  const dispatch = useDispatch();
  const unit = useSelector((s) => s.weather.unit);
  const temp = unit === "C" ? `${data.temp_c}°C` : `${data.temp_f}°F`;

  const openDetails = () => {
    dispatch(setSelectedCity(city));
    dispatch(fetchCityBundle(city));
  };

  return (
    <button
      onClick={openDetails}
      className="group relative bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 backdrop-blur-xl text-left text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-4 w-full h-full border border-slate-700/50 hover:border-blue-500/50 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <h3 className="text-xl font-bold capitalize mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
          {city}
        </h3>

        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="relative">
            <img
              src={data.condition?.icon}
              alt={data.condition?.text}
              className="w-16 h-16 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          
          <span className="text-4xl font-extrabold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
            {temp}
          </span>
          
          <p className="text-sm text-slate-300 font-medium text-center px-2 py-1 bg-slate-700/50 rounded-lg">
            {data.condition?.text}
          </p>
        </div>

        <div className="flex items-center justify-around gap-4 pt-3 border-t border-slate-700/50">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">💧</span>
            <span className="text-xs text-slate-400 font-medium">Humidity</span>
            <span className="text-sm font-bold text-blue-400">{data.humidity}%</span>
          </div>
          
          <div className="h-12 w-px bg-slate-700/50"></div>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">🌬️</span>
            <span className="text-xs text-slate-400 font-medium">Wind</span>
            <span className="text-sm font-bold text-cyan-400">{data.wind_kph} kph</span>
          </div>
        </div>
      </div>

      {/* Click indicator */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-slate-400 flex items-center gap-1">
        <span>View Details</span>
        <span>→</span>
      </div>
    </button>
  );
}