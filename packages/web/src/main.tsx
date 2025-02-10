import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { RestaurantProvider } from "./contexts/RestaurantContext";

import App from "./App";
import Restaurant from "./pages/Restaurant";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RestaurantProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/restaurant">
          <Route path=":restaurantId" element={<Restaurant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </RestaurantProvider>
);
