import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity, addFavorite } from "../redux/weatherSlice";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";

export default function CityDetails() {
  const dispatch = useDispatch();
  const { selectedCity, forecastByCity, currentByCity, unit } = useSelector(
    (s) => s.weather
  );

  if (!selectedCity) return null;

  const forecast = forecastByCity[selectedCity];
  const current = currentByCity[selectedCity];
  if (!forecast || !current) return null;

  const daily = forecast.forecastday.map((d) => ({
    date: d.date,
    temp: unit === "C" ? d.day.avgtemp_c : d.day.avgtemp_f,
    precip: d.day.totalprecip_mm,
    wind: d.day.maxwind_kph,
  }));

  const hourly = (forecast.forecastday?.[0]?.hour || []).map((h) => ({
    time: h.time.slice(-5),
    temp: unit === "C" ? h.temp_c : h.temp_f,
    precip: h.precip_mm,
    wind: h.wind_kph,
  }));

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => dispatch(setSelectedCity(null))}
      />
      <div className="relative z-50 w-[min(1100px,92vw)] max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 p-6 shadow-xl text-white">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-semibold mb-1">
              {selectedCity} — 7 Day Forecast
            </h2>
            <p className="text-slate-300 text-sm">
              Now:{" "}
              {unit === "C"
                ? `${current.temp_c}°C`
                : `${current.temp_f}°F`}{" "}
              | {current.condition.text} | Humidity {current.humidity}% | Wind {current.wind_kph} kph
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => dispatch(addFavorite(selectedCity))}
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition"
            >
              ⭐ Favorite
            </button>
            <button
              onClick={() => dispatch(setSelectedCity(null))}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-md transition"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Current stats grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Stat label="Pressure" value={`${current.pressure_mb} mb`} />
          <Stat label="UV Index" value={current.uv} />
          <Stat
            label="Feels Like"
            value={
              unit === "C"
                ? `${current.feelslike_c}°C`
                : `${current.feelslike_f}°F`
            }
          />
          <Stat label="Visibility" value={`${current.vis_km} km`} />
        </div>

        {/* Charts */}
        <Section title="📈 Daily Temperature">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={daily}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#38bdf8" dot />
            </LineChart>
          </ResponsiveContainer>
        </Section>

        <Section title="🕒 Hourly Temperature (Today)">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourly}>
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Area dataKey="temp" stroke="#38bdf8" fill="#0ea5e9" />
            </AreaChart>
          </ResponsiveContainer>
        </Section>

        <Section title="🌧 Precipitation & 💨 Wind Speed (Daily)">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={daily}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="precip" name="Precip (mm)" fill="#38bdf8" />
              <Line dataKey="wind" name="Wind (kph)" stroke="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-800/70 rounded-lg p-4 text-center">
      <div className="text-slate-400 text-sm mb-1">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
