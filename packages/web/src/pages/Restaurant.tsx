import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import MenuList from "@/components/MenuList";
import OpenStatus from "@/components/OpenStatus";

import { IShortMenu } from "../../../types";

import { useRestaurant } from "@/contexts/RestaurantContext";

import { getRestaurantInfoAndMenus } from "@/services/restaurantService";

import { isRestaurantOpen } from "@/utils/timeCheck";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const { restaurantInfo, setRestaurantInfo } = useRestaurant();

  const [menus, setMenus] = useState<IShortMenu[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerBottomRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    const data = await getRestaurantInfoAndMenus(restaurantId ?? "", page, 10);

    if (data) {
      setRestaurantInfo(data.info);
      setMenus((prev) => [...prev, ...data.menus]);
      setIsOpen(isRestaurantOpen(data.info.activeTimePeriod));
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    }
    setIsLoading(false);
  }, [page, hasMore, isLoading, setRestaurantInfo, restaurantId]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!observerBottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchData();
        }
      },
      { threshold: 1.0 }
    );

    if (observerBottomRef.current) observer.observe(observerBottomRef.current);

    return () => observer.disconnect();
  }, [fetchData, hasMore]);

  return (
    <div className="h-screen overflow-auto">
      {restaurantInfo ? (
        <>
          {/* cover image */}
          <img
            src={restaurantInfo.coverImage}
            alt={restaurantInfo.name}
            className="w-full h-[30%] xl:h-[40%] 2xl:h-[40%]"
          />

          <div className="flex flex-col items-center justify-center mt-6 md:mt-6 mx-4">
            <div className="flex items-center gap-4">
              {/* name */}
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                {restaurantInfo.name}
              </h1>

              {/* status */}
              <OpenStatus isOpen={isOpen} />
            </div>

            {/* menu list */}
            <div className="mt-8">
              <MenuList menuList={menus} />
            </div>

            {isLoading && <p>loading more</p>}

            {/* bottom observer */}
            <div ref={observerBottomRef} className="h-[20px]" />
          </div>
        </>
      ) : (
        <>No data</>
      )}
    </div>
  );
};

export default Restaurant;
