import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import MenuList from "@/components/MenuList";
import OpenStatus from "@/components/OpenStatus";
import BottomSheet from "@/components/BottomSheet";

import { FaArrowLeft } from "react-icons/fa6";

import { IShortMenu } from "../../../types";

import { useRestaurant } from "@/contexts/RestaurantContext";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

import { getRestaurantInfoAndMenus } from "@/services/restaurantService";

import { checkIsRestaurantOpen } from "@/utils/timeCheck";

const Restaurant = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const {
    restaurantInfo,
    setRestaurantInfo,
    setSelectedRestaurantId,
    setSelectedMenuId,
  } = useRestaurant();

  const { isOpenBottomSheet, setIsOpenBottomSheet } = useBottomSheet();

  const [menus, setMenus] = useState<IShortMenu[]>([]);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState<boolean>(false);

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
      setIsRestaurantOpen(checkIsRestaurantOpen(data.info.activeTimePeriod));
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    }
    setIsLoading(false);
  }, [page, hasMore, isLoading, setRestaurantInfo, restaurantId]);

  useEffect(() => {
    fetchData();
    setSelectedRestaurantId(parseInt(restaurantId as string));
    setSelectedMenuId(undefined);
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
          {/* back button */}
          <div
            className="p-3 rounded-full w-fit shadow-2xl z-2 absolute top-5 left-5 hover:bg-[#28639b] bg-[#50bd60] duration-200"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft color="#fff" />
          </div>

          {/* cover image */}
          <div className="w-full aspect-[16/9] md:aspect-[16/6] lg:aspect-[16/4] overflow-hidden relative">
            <img
              src={restaurantInfo.coverImage}
              alt={restaurantInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-6 md:mt-6 mx-4">
            <div className="flex items-center gap-4">
              {/* name */}
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                {restaurantInfo.name}
              </h1>

              {/* status */}
              <OpenStatus isOpen={isRestaurantOpen} />
            </div>

            {/* menu list */}
            <div className="mt-8">
              <MenuList menuList={menus} />
            </div>

            <BottomSheet
              isOpen={isOpenBottomSheet}
              onClose={() => setIsOpenBottomSheet(false)}
            />

            {isLoading && (
              <div className="bg-gray-300 animate-pulse flex mx-4 p-4 rounded-xl">
                {/* image skeletion */}
                <div className="size-[80px] md:size-[100px] 2xl:size-[120px] rounded-2xl bg-gray-400 " />
                {/* text skeletion */}
                <div>
                  <div className="h-6 w-[200px] bg-gray-400 m-2 rounded-xl" />
                  <div className="h-6 w-[100px] bg-gray-400 m-2 rounded-xl" />
                </div>
              </div>
            )}

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
