import { useEffect, useState } from "react";

import { useRestaurant } from "@/contexts/RestaurantContext";

import { getFullMenu } from "@/services/restaurantService";

import { IFullMenu, IRestaurantInfo, IShortMenu } from "../../../types";

import { IoMdClose } from "react-icons/io";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet = ({ isOpen, onClose }: BottomSheetProps) => {
  const { selectedMenuId, selectedRestaurantId } = useRestaurant();

  const [menuInfo, setMenuInfo] = useState<IFullMenu>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const fetchFullMenu = async (
    restaurantId: IRestaurantInfo["id"],
    menuId: IShortMenu["id"]
  ) => {
    try {
      setIsLoading(true);
      const data = await getFullMenu(restaurantId, menuId);

      setMenuInfo(data);
    } catch (error) {
      console.log("🚀 ~ BottomSheet ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRestaurantId && selectedMenuId) {
      fetchFullMenu(selectedRestaurantId, selectedMenuId);
    }
  }, [selectedRestaurantId, selectedMenuId]);

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          isOpen ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Container */}
      <div
        className={`fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto bg-white rounded-t-xl shadow-lg transition-transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {isLoading ? (
          <div className="h-[500px] bg-gray-300 animate-pulse m-4 flex flex-col gap-2">
            {/* name skeleton */}
            <div className="h-10 bg-gray-400 m-2 rounded-xl" />

            {/* image skeleton */}
            <div className="h-[300px] bg-gray-400 m-2 rounded-xl" />

            {/* text skeletion */}
            <div className="h-6 bg-gray-400 m-2 rounded-xl" />
            <div className="h-6 bg-gray-400 m-2 rounded-xl" />
            <div className="h-6 bg-gray-400 m-2 rounded-xl" />
            <div className="h-6 bg-gray-400 m-2 rounded-xl" />
          </div>
        ) : (
          <>
            {menuInfo ? (
              <>
                {/* header */}
                <div className="py-3">
                  <h2 className="text-2xl font-normal text-center">
                    {menuInfo.name}
                  </h2>

                  {/* close button */}
                  <div
                    className="absolute top-3 right-3 hover:bg-gray-100 rounded-full p-1 duration-200"
                    onClick={onClose}
                  >
                    <IoMdClose size={24} />
                  </div>
                </div>

                <div className="w-full aspect-[16/9] overflow-hidden relative">
                  <img
                    src={menuInfo.largeImage}
                    alt={menuInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-h-[300px]">
                  {/* price */}
                  <span className="text-3xl">
                    ราคา {menuInfo.fullPrice} บาท
                  </span>

                  {/* add to cart */}
                  <button className="bg-green-500 py-2 px-4 rounded-lg text-white hover:shadow-lg">
                    เพิ่มลงตระกร้า
                  </button>
                </div>
              </>
            ) : (
              <>no data</>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BottomSheet;
