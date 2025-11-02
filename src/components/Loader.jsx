import React from "react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-slate-200">
      <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
