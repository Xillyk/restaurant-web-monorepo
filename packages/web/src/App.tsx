import React, { useEffect, useState } from "react";
import { getRestaurantInfo } from "./services/restaurantService";
// import { IRestaurantInfo } from "../../types";
import { isRestaurantOpen } from "./utils/timeCheck";
import { useRestaurant } from "./contexts/RestaurantContext";

const restaurantIds = ["567051", "227018"];

const App = () => {
  const { restaurantInfo, setRestaurantInfo } = useRestaurant();
  console.log("🚀 ~ App ~ restaurantInfo:", restaurantInfo);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurantInfo(restaurantIds[0]);

      if (data) {
        setRestaurantInfo(data);
        setIsOpen(isRestaurantOpen(data.activeTimePeriod));
      }
    };

    fetchData();
  }, []);

  // const fetchMenus = async () => {
  //   const numToFetch = 10;
  //   const menusList = restaurantInfo?.menus.slice(0, numToFetch);

  //   // call api

  //   // backend serve first 10 for the first time (with flag)
  // };

  return (
    <div className="h-screen bg-red-200 overflow-auto">
      {restaurantInfo && (
        <>
          {/* cover image */}

          <img src={restaurantInfo.coverImage} alt="restaurantInfo image" />

          {/* name */}
          <h1 className="text-4xl font-bold">{restaurantInfo.name}</h1>

          <div
            className={`${
              isOpen ? "bg-green-500" : "bg-red-500"
            } w-fit px-6 py-1 rounded-xl text-white`}
          >
            <span>{isOpen ? "Open" : "Close"}</span>
          </div>

          {/* status */}

          {/* menu list */}
          {restaurantInfo.menus.map((menu, index) => (
            <div key={index}>{menu}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
