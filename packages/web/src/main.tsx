import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { RestaurantProvider } from "./contexts/RestaurantContext";
import { BottomSheetProvider } from "./contexts/BottomSheetContext";

import AllRestaurants from "./pages/AllRestaurants";
import Restaurant from "./pages/Restaurant";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RestaurantProvider>
    <BottomSheetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllRestaurants />}></Route>
          <Route path="/restaurant">
            <Route path=":restaurantId" element={<Restaurant />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BottomSheetProvider>
  </RestaurantProvider>
);
