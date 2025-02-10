import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RestaurantProvider } from "./contexts/RestaurantContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RestaurantProvider>
    <App />
  </RestaurantProvider>
);
