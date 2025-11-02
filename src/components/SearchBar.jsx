import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestions } from "../redux/weatherSlice";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { suggestions } = useSelector((s) => s.weather);

  // simple debounce to reduce API calls
  const debounced = useMemo(() => {
    let t;
    return (q) => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (q.trim().length >= 2) dispatch(fetchSuggestions(q.trim()));
      }, 250);
    };
  }, [dispatch]);

  useEffect(() => {
    debounced(query);
  }, [query, debounced]);

  const submit = (text) => {
    const q = (text ?? query).trim();
    if (!q) return;
    onSearch(q);
    setQuery("");
  };

  return (
    <div className="relative w-72">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
        />
        <button
          onClick={() => submit()}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded text-white font-semibold"
        >
          Search
        </button>
      </div>

      {/* autocomplete dropdown */}
      {query && suggestions?.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded bg-slate-800 border border-slate-700 shadow">
          {suggestions.slice(0, 6).map((sug) => (
            <li
              key={`${sug.id || sug.name}-${sug.region}-${sug.country}`}
              onClick={() => submit(sug.name)}
              className="px-3 py-2 cursor-pointer hover:bg-slate-700 text-sm"
            >
              {sug.name} <span className="text-slate-400">· {sug.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
