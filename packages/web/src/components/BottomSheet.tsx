import { useEffect, useState } from "react";

import BottomSheetSkeleton from "./skeleton/BottomSheetSkeleton";
import CheckBox from "./common/CheckBox";

import { useRestaurant } from "@/contexts/RestaurantContext";

import { getFullMenu } from "@/services/restaurantService";

import { IFullMenu, IRestaurantInfo, IShortMenu } from "../../../types";

import { IoMdClose } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import TextInput from "./common/TextInput";

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
          <BottomSheetSkeleton />
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

                <div className="h-max mx-4 mt-2">
                  {/* header */}
                  <div className="flex justify-between">
                    {/* price */}
                    <span className="text-3xl">
                      ราคา {menuInfo.fullPrice} บาท
                    </span>

                    {/* total sell */}
                    {menuInfo.sold > 0 && (
                      <div className="flex items-center gap-1">
                        <IoBagCheckOutline size={20} />

                        <span>{menuInfo.sold} คำสั่งซื้อ</span>
                      </div>
                    )}
                  </div>

                  {/* divider */}
                  <div className="border-t-1 border-gray-200 w-full my-2" />

                  {menuInfo.options.length > 0 ? (
                    <div className="mt-2">
                      <span className="text-gray-400 text-lg">
                        ตัวเลือกเพิ่มเติม
                      </span>
                      {menuInfo.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mt-2">
                          <span className="text-lg">{option.label}</span>

                          {/* choices */}
                          {option.choices.map((choice, choiceIndex) => (
                            <div
                              className="flex items-center gap-2 mt-1"
                              key={choiceIndex}
                            >
                              <CheckBox />
                              <span className="w-[150px] text-md">
                                {choice.label}
                              </span>
                              <span className="text-red-500 text-sm">
                                (หมด)
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      ไม่มีตัวเลือกเพิ่มเติม
                    </span>
                  )}

                  {/* comment */}
                  <div className="mt-8">
                    <span className="text-lg text-gray-700">
                      หมายเหตุเพิ่มเติม
                    </span>
                    <div className="mt-1">
                      <TextInput placeHolder="ตัวอย่าง: ไม่ใส่ผัก" />
                    </div>
                  </div>

                  {/* add to cart */}
                  <div className="flex items-center justify-center mb-8 mt-6">
                    <button className="bg-green-500 py-2 px-4 rounded-lg text-white hover:shadow-lg">
                      เพิ่มลงตระกร้า
                    </button>
                  </div>
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
