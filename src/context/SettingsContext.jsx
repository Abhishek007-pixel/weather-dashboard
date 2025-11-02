import React, { createContext, useContext, useEffect, useState } from "react";

const SettingsCtx = createContext();

export const SettingsProvider = ({ children }) => {
  const [unit, setUnit] = useState(() => localStorage.getItem("unit") || "C"); // "C" | "F"

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  const toggleUnit = () => setUnit((u) => (u === "C" ? "F" : "C"));

  return (
    <SettingsCtx.Provider value={{ unit, toggleUnit }}>
      {children}
    </SettingsCtx.Provider>
  );
};

export const useSettings = () => useContext(SettingsCtx);
