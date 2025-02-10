import React, { createContext, useState, ReactNode, useContext } from "react";
import { IRestaurantInfo } from "../../../types";

interface IRestaurantContext {
  restaurantInfo: IRestaurantInfo | undefined;
  setRestaurantInfo: React.Dispatch<
    React.SetStateAction<IRestaurantInfo | undefined>
  >;
}

const RestaurantContext = createContext<IRestaurantContext>({
  restaurantInfo: undefined,
  setRestaurantInfo: () => {},
});

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [restaurantInfo, setRestaurantInfo] = useState<IRestaurantInfo>();

  return (
    <RestaurantContext.Provider value={{ restaurantInfo, setRestaurantInfo }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};
