import React, { createContext, useState, ReactNode, useContext } from "react";
import { IRestaurantInfo, IShortMenu } from "../../../types";

interface IRestaurantContext {
  restaurantInfo: IRestaurantInfo | undefined;
  setRestaurantInfo: React.Dispatch<
    React.SetStateAction<IRestaurantInfo | undefined>
  >;
  selectedRestaurantId: IRestaurantInfo["id"] | undefined;
  setSelectedRestaurantId: React.Dispatch<
    React.SetStateAction<IRestaurantInfo["id"] | undefined>
  >;
  selectedMenuId: IShortMenu["id"] | undefined;
  setSelectedMenuId: React.Dispatch<
    React.SetStateAction<IShortMenu["id"] | undefined>
  >;
}

const RestaurantContext = createContext<IRestaurantContext>({
  restaurantInfo: undefined,
  setRestaurantInfo: () => {},
  selectedRestaurantId: undefined,
  setSelectedRestaurantId: () => {},
  selectedMenuId: undefined,
  setSelectedMenuId: () => {},
});

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [restaurantInfo, setRestaurantInfo] = useState<IRestaurantInfo>();
  const [selectedRestaurantId, setSelectedRestaurantId] =
    useState<IRestaurantInfo["id"]>();

  const [selectedMenuId, setSelectedMenuId] = useState<IShortMenu["id"]>();

  return (
    <RestaurantContext.Provider
      value={{
        restaurantInfo,
        setRestaurantInfo,
        selectedRestaurantId,
        setSelectedRestaurantId,
        selectedMenuId,
        setSelectedMenuId,
      }}
    >
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
