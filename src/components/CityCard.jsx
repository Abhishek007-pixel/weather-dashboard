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
      className="bg-slate-800/70 backdrop-blur text-left text-white p-5 rounded-xl shadow hover:shadow-xl hover:bg-slate-700/80 transition flex flex-col items-center gap-3 w-full h-full"
    >
      <h3 className="text-lg font-semibold capitalize">{city}</h3>

      <div className="flex flex-col items-center gap-1">
        <img
          src={data.condition?.icon}
          alt={data.condition?.text}
          className="w-12 h-12"
          loading="lazy"
        />
        <span className="text-2xl font-bold">{temp}</span>
        <p className="text-sm text-slate-300">{data.condition?.text}</p>
      </div>

      <p className="text-sm text-slate-400 text-center leading-snug">
        💧 Humidity: {data.humidity}% <br />
        🌬 Wind: {data.wind_kph} kph
      </p>
    </button>
  );
}
