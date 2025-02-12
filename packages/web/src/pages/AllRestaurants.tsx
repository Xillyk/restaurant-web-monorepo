import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useRestaurant } from "@/contexts/RestaurantContext";
import { getRestaurantInfoAndMenus } from "@/services/restaurantService";

import {
  IRestaurantInfo,
  IRestaurantInfoAndMenusPagination,
} from "../../../types";
import { checkIsRestaurantOpen } from "@/utils/timeCheck";
import OpenStatus from "@/components/OpenStatus";
import RestaurantCardSkeleton from "@/components/skeleton/RestaurantCardSkeleton";

const restaurantIds = [567051, 227018];

const AllRestaurants = () => {
  const navigate = useNavigate();
  const { setRestaurantInfo } = useRestaurant();

  const [restaurants, setRestaurants] = useState<IRestaurantInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setRestaurantInfo(undefined);
  }, [setRestaurantInfo]);

  const fetchAllRestaurants = async (
    restaurantIds: IRestaurantInfo["id"][]
  ) => {
    try {
      const results = await Promise.all(
        restaurantIds.map((id) => getRestaurantInfoAndMenus(id, 1, 10))
      );

      return results as IRestaurantInfoAndMenusPagination[];
    } catch (error) {
      console.log("🚀 ~ AllRestaurants ~ error:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchAllRestaurants(restaurantIds);

      if (data) {
        const restaurants = data.map((d) => d.info);
        setRestaurants(restaurants);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen mx-4">
      <div className="my-4">
        <h1 className="text-center font-bold text-3xl text-[#28639b]">
          สั่งอะไรดี ?
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
          </>
        ) : (
          <>
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-[#50bd60] rounded-3xl py-6 relative hover:shadow-xl duration-200"
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              >
                <div className="absolute top-3 right-3 bg-white px-1 py-1 rounded-2xl">
                  <OpenStatus
                    isOpen={checkIsRestaurantOpen(restaurant.activeTimePeriod)}
                  />
                </div>

                <span className="absolute bottom-10 left-2 text-white bg-[#28639b] px-6 py-2 rounded-3xl font-semibold text-xl md:text-2xl">
                  {restaurant.name}
                </span>

                <img
                  src={restaurant.coverImage}
                  alt="cover image"
                  className="aspect-[16/9]"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllRestaurants;
