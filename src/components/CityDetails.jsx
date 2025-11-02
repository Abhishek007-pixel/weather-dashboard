import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity, addFavorite } from "../redux/weatherSlice";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

export default function CityDetails() {
  const dispatch = useDispatch();
  const { selectedCity, forecastByCity, currentByCity, unit } = useSelector(
    (s) => s.weather
  );
  const [dateRange, setDateRange] = useState("all");

  if (!selectedCity) return null;

  const forecast = forecastByCity[selectedCity];
  const current = currentByCity[selectedCity];
  if (!forecast || !current) return null;

  // Daily data with enhanced metrics
  const allDaily = forecast.forecastday.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    fullDate: d.date,
    temp: unit === "C" ? d.day.avgtemp_c : d.day.avgtemp_f,
    maxTemp: unit === "C" ? d.day.maxtemp_c : d.day.maxtemp_f,
    minTemp: unit === "C" ? d.day.mintemp_c : d.day.mintemp_f,
    precip: d.day.totalprecip_mm,
    humidity: d.day.avghumidity,
    wind: d.day.maxwind_kph,
    uv: d.day.uv,
    condition: d.day.condition.text,
  }));

  // Filter based on date range
  const daily = dateRange === "3" ? allDaily.slice(0, 3) : 
                dateRange === "5" ? allDaily.slice(0, 5) : allDaily;

  // Hourly data (today) with more details
  const hourly = (forecast.forecastday?.[0]?.hour || []).map((h) => ({
    time: h.time.slice(-5),
    fullTime: h.time,
    temp: unit === "C" ? h.temp_c : h.temp_f,
    feelsLike: unit === "C" ? h.feelslike_c : h.feelslike_f,
    precip: h.precip_mm,
    humidity: h.humidity,
    wind: h.wind_kph,
    windDir: h.wind_dir,
    pressure: h.pressure_mb,
    visibility: h.vis_km,
  }));

  // Wind direction radar data
  const windDirections = hourly.slice(0, 8).map((h, i) => ({
    direction: h.windDir,
    speed: h.wind,
    time: h.time,
  }));

  // Custom tooltip styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm p-4 rounded-lg border border-slate-700 shadow-xl">
          <p className="font-semibold text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: <span className="font-bold">{entry.value}</span>
              {entry.name.includes('Temp') && `°${unit}`}
              {entry.name.includes('Precip') && ' mm'}
              {entry.name.includes('Wind') && ' kph'}
              {entry.name.includes('Humidity') && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => dispatch(setSelectedCity(null))}
      />
      <div className="relative z-50 w-[min(1200px,95vw)] max-h-[95vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl text-white border border-slate-700/50">
        
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-6 border border-blue-500/20">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {selectedCity}
              </h2>
              <p className="text-slate-300 text-lg flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-2">
                  🌡️ {unit === "C" ? `${current.temp_c}°C` : `${current.temp_f}°F`}
                </span>
                <span>•</span>
                <span>{current.condition.text}</span>
                <span>•</span>
                <span>💧 {current.humidity}%</span>
                <span>•</span>
                <span>🌬️ {current.wind_kph} kph</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => dispatch(addFavorite(selectedCity))}
                className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                ⭐ Favorite
              </button>
              <button
                onClick={() => dispatch(setSelectedCity(null))}
                className="px-5 py-2.5 bg-slate-700/80 hover:bg-slate-600/80 backdrop-blur text-white font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>

        {/* Current stats grid with glassmorphism */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon="🌡️" 
            label="Feels Like" 
            value={unit === "C" ? `${current.feelslike_c}°C` : `${current.feelslike_f}°F`}
            color="from-red-500/20 to-orange-500/20"
          />
          <StatCard 
            icon="🔆" 
            label="UV Index" 
            value={current.uv}
            color="from-yellow-500/20 to-amber-500/20"
          />
          <StatCard 
            icon="📊" 
            label="Pressure" 
            value={`${current.pressure_mb} mb`}
            color="from-blue-500/20 to-cyan-500/20"
          />
          <StatCard 
            icon="👁️" 
            label="Visibility" 
            value={`${current.vis_km} km`}
            color="from-purple-500/20 to-pink-500/20"
          />
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center justify-between mb-6 bg-slate-800/50 backdrop-blur p-4 rounded-xl">
          <h3 className="text-xl font-semibold">📅 Forecast Range</h3>
          <div className="flex gap-2">
            {['3', '5', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dateRange === range
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {range === 'all' ? 'All Days' : `${range} Days`}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Temperature Trends Chart */}
        <ChartSection 
          title="📈 Temperature Trends" 
          subtitle="Daily high, average, and low temperatures"
        >
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={daily}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '14px', fontWeight: 500 }} />
              <Area 
                type="monotone" 
                dataKey="temp" 
                fill="url(#colorTemp)" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Avg Temp"
              />
              <Line 
                type="monotone" 
                dataKey="maxTemp" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                name="Max Temp"
              />
              <Line 
                type="monotone" 
                dataKey="minTemp" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
                name="Min Temp"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* Hourly Temperature with Feels Like */}
        <ChartSection 
          title="🕒 Hourly Temperature (Today)" 
          subtitle="Temperature and feels like temperature"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourly}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '11px', fontWeight: 500 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '14px', fontWeight: 500 }} />
              <Area 
                dataKey="temp" 
                stroke="#8b5cf6" 
                fill="url(#tempGradient)" 
                strokeWidth={2}
                name="Temperature"
              />
              <Line 
                type="monotone" 
                dataKey="feelsLike" 
                stroke="#ec4899" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Feels Like"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* Precipitation & Humidity */}
        <ChartSection 
          title="🌧️ Precipitation & Humidity" 
          subtitle="Daily rainfall and humidity levels"
        >
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '14px', fontWeight: 500 }} />
              <Bar 
                dataKey="precip" 
                fill="#06b6d4" 
                name="Precipitation (mm)" 
                radius={[8, 8, 0, 0]}
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="#14b8a6" 
                strokeWidth={3}
                dot={{ fill: '#14b8a6', r: 5 }}
                name="Humidity (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* Wind Speed & Direction */}
        <ChartSection 
          title="💨 Wind Speed & Direction" 
          subtitle="Daily wind patterns"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={daily}>
              <defs>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '14px', fontWeight: 500 }} />
              <Bar 
                dataKey="wind" 
                fill="url(#windGradient)" 
                name="Wind Speed (kph)" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* UV Index Chart */}
        <ChartSection 
          title="☀️ UV Index Forecast" 
          subtitle="Daily UV radiation levels"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px', fontWeight: 500 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '14px', fontWeight: 500 }} />
              <Bar 
                dataKey="uv" 
                fill="#a855f7" 
                name="UV Index" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>
      </div>
    </div>
  );
}

function ChartSection({ title, subtitle, children }) {
  return (
    <div className="mb-10 bg-slate-800/30 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} backdrop-blur rounded-xl p-5 text-center border border-white/10 hover:border-white/20 transition-all transform hover:scale-105 hover:shadow-xl`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-slate-300 text-sm mb-1 font-medium">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}