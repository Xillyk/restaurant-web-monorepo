import React, { useMemo } from "react";

import { useRestaurant } from "@/contexts/RestaurantContext";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

import { getMenuPrice } from "@/utils/calculatePrice";
import { checkIsInDiscountPeriod } from "@/utils/timeCheck";

import { IShortMenu } from "../../../types";

import NoImage from "@/assets/no-image.jpg";
import { RiDiscountPercentLine } from "react-icons/ri";
import { FaFireAlt } from "react-icons/fa";

interface MenuCardProps {
  menu: IShortMenu;
  isRecommendList?: boolean;
}

const MenuCard = ({ menu, isRecommendList }: MenuCardProps) => {
  const { setSelectedMenuId } = useRestaurant();
  const { setIsOpenBottomSheet } = useBottomSheet();

  const imageSrc = useMemo(
    () => menu.thumbnailImage ?? NoImage,
    [menu.thumbnailImage]
  );

  const handleClickMenu = () => {
    setSelectedMenuId(menu.id);
    setIsOpenBottomSheet(true);
  };

  return (
    <div
      className="h-[100px] md:h-[120px] 2xl:h-[140px] rounded-2xl w-xs sm:w-xs md:w-lg lg:w-xl flex gap-4 cursor-pointer relative"
      onClick={() => handleClickMenu()}
    >
      {/* top sell badge */}
      {isRecommendList && (
        <div className="absolute text-red-500 flex items-center gap-1 bg-red-200 text-sm px-2 rounded-3xl py-1">
          <FaFireAlt size={16} /> <span className="">ขายดี</span>
        </div>
      )}
      <img
        src={imageSrc}
        alt={menu.name}
        className="size-[80px] md:size-[100px] 2xl:size-[120px] rounded-2xl"
      />

      <div className="flex flex-col gap-1">
        <span className="text-sm md:text-xl font-semibold line-clamp-2">
          {menu.name}
        </span>

        <div className="flex sm:block items-center gap-2">
          <div className="flex items-center gap-2">
            {menu.discountedPercent > 0 &&
            checkIsInDiscountPeriod(menu.discountedTimePeriod) ? (
              <div className="text-lg md:text-xl font-medium flex gap-2 items-center">
                <span
                  className={`${"line-through decoration-[2px] text-red-500"} text-sm md:text-lg`}
                >
                  {menu.fullPrice}
                </span>

                <span className="text-green-600">{getMenuPrice(menu)}</span>
              </div>
            ) : (
              // no discount -> show full price
              <span className={`text-sm md:text-xl font-medium text-gray-700`}>
                {getMenuPrice(menu)}
              </span>
            )}

            <span className="text-sm md:text-lg font-normal text-gray-600">
              บาท
            </span>
          </div>

          {/* discount badge */}
          {menu.discountedPercent > 0 &&
            checkIsInDiscountPeriod(menu.discountedTimePeriod) && (
              <div className="flex items-center gap-1 bg-orange-500 text-white w-fit px-2 md:px-4 rounded-xl py-[1px] text-sm md:text-lg md:mt-1">
                {menu.discountedPercent} <RiDiscountPercentLine size={20} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
