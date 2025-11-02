import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../redux/weatherSlice";


export default function SettingsToggle() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.weather.unit);

  return (
    <div className="flex items-center gap-2 justify-end mt-4 mr-6">
      <button
        onClick={() => dispatch(toggleUnit())}
        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded transition"
      >
        Switch to {unit === "C" ? "°F" : "°C"}
      </button>
    </div>
  );
}
