import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}