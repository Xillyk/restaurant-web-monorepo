import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import MenuList from "@/components/MenuList";
import OpenStatus from "@/components/OpenStatus";
import BottomSheet from "@/components/BottomSheet";
import RestaurantSkeleton from "@/components/skeleton/RestaurantSkeleton";
import MenuLoadingSkeleton from "@/components/skeleton/MenuLoadingSkeleton";

import { FaArrowLeft } from "react-icons/fa6";

import { IShortMenu } from "../../../types";

import { useRestaurant } from "@/contexts/RestaurantContext";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

import {
  getRestaurantInfoAndMenus,
  getTopRecommendMenus,
} from "@/services/restaurantService";

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
  const [topMenus, setTopMenus] = useState<IShortMenu[]>([]);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isLoadingPopularMenus, setIsLoadingPopularMenus] =
    useState<boolean>(false);
  const [isLoadingAllMenus, setIsLoadingAllMenus] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerBottomRef = useRef<HTMLDivElement | null>(null);

  const fetchPopularMenus = useCallback(async () => {
    setIsLoadingPopularMenus(true);
    const data = await getTopRecommendMenus(parseInt(restaurantId ?? ""), 3);

    if (data) {
      setTopMenus(data);
    }
    setIsLoadingPopularMenus(false);
  }, [restaurantId]);

  const fetchMenus = useCallback(async () => {
    if (!hasMore || isLoadingAllMenus) return;

    setIsLoadingAllMenus(true);
    const data = await getRestaurantInfoAndMenus(restaurantId ?? "", page, 10);

    if (data) {
      setRestaurantInfo(data.info);
      setMenus((prev) => [...prev, ...data.menus]);
      setIsRestaurantOpen(checkIsRestaurantOpen(data.info.activeTimePeriod));
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    }
    setIsLoadingAllMenus(false);
  }, [page, hasMore, isLoadingAllMenus, setRestaurantInfo, restaurantId]);

  useEffect(() => {
    fetchMenus();
    setSelectedRestaurantId(parseInt(restaurantId as string));
    setSelectedMenuId(undefined);

    if (isFirstLoad) {
      fetchPopularMenus();
    } else {
      setIsFirstLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!observerBottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMenus();
        }
      },
      { threshold: 1.0 }
    );

    if (observerBottomRef.current) observer.observe(observerBottomRef.current);

    return () => observer.disconnect();
  }, [fetchMenus, hasMore]);

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

            {/* popular list */}
            <div className="mt-8 flex flex-col gap-2 w-fit">
              <span className="text-xl text-orange-600">รายการแนะนำ</span>

              {isLoadingPopularMenus ? (
                <>
                  <MenuLoadingSkeleton />
                </>
              ) : (
                <div
                  className={`${
                    !isRestaurantOpen && "opacity-50 pointer-events-none"
                  }`}
                >
                  <MenuList menuList={topMenus} />
                </div>
              )}
            </div>

            {/* menu list */}
            <div className="mt-8">
              <span className="text-xl">เมนูทั้งหมด</span>
              <div
                className={`mt-2 ${
                  !isRestaurantOpen && "opacity-50 pointer-events-none"
                }`}
              >
                <MenuList menuList={menus} />
              </div>
            </div>

            <BottomSheet
              isOpen={isOpenBottomSheet}
              onClose={() => setIsOpenBottomSheet(false)}
            />

            {isLoadingAllMenus && <MenuLoadingSkeleton />}

            {/* bottom observer */}
            <div ref={observerBottomRef} className="h-[20px]" />
          </div>
        </>
      ) : (
        // loading skeleton
        <RestaurantSkeleton />
      )}
    </div>
  );
};

export default Restaurant;
