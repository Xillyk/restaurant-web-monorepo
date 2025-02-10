import React, { useCallback, useEffect, useRef, useState } from "react";
import { getRestaurantInfoAndMenus } from "./services/restaurantService";
import { useRestaurant } from "./contexts/RestaurantContext";
import { IShortMenu } from "../../types";
import { isRestaurantOpen } from "./utils/timeCheck";

const restaurantIds = ["567051", "227018"];

const App = () => {
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
    const data = await getRestaurantInfoAndMenus(restaurantIds[1], page, 10);
    console.log("🚀 ~ fetchData ~ data:", data);

    if (data) {
      setRestaurantInfo(data.info);
      setMenus((prev) => [...prev, ...data.menus]);
      setIsOpen(isRestaurantOpen(data.info.activeTimePeriod));
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    }
    setIsLoading(false);
  }, [page, hasMore, isLoading, setRestaurantInfo]);

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
    <div className="h-screen bg-red-200 overflow-auto">
      {restaurantInfo ? (
        <>
          {/* cover image */}
          <img src={restaurantInfo.coverImage} alt={restaurantInfo.name} />

          <div className="flex items-center gap-2">
            {/* name */}
            <h1 className="text-4xl font-bold">{restaurantInfo.name}</h1>

            {/* status */}
            <div
              className={`${
                isOpen ? "bg-green-500" : "bg-red-500"
              } w-fit px-6 py-1 rounded-xl text-white`}
            >
              <span>{isOpen ? "เปิด" : "ปิด"}</span>
            </div>
          </div>

          {/* menu list */}
          <div className="mt-4">
            {menus.map((menu, index) => (
              <div
                key={index}
                className="h-[140px] rounded-2xl w-full flex flex-col gap-4 cursor-pointer"
              >
                <div className="flex gap-4">
                  <div>
                    <img
                      src={menu.thumbnailImage}
                      alt={menu.name}
                      className="size-[100px] rounded-2xl"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span>{menu.name}</span>
                    <span>{`${menu.fullPrice} บาท`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={observerBottomRef}
            style={{ height: "20px", background: "transparent" }}
          />
          {isLoading && <p>loading more</p>}
        </>
      ) : (
        <>No data</>
      )}
    </div>
  );
};

export default App;
