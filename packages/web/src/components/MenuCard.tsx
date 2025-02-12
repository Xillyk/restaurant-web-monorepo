import React, { useMemo } from "react";

import { useRestaurant } from "@/contexts/RestaurantContext";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

import { getMenuPrice } from "@/utils/calculatePrice";
import { checkIsInDiscountPeriod } from "@/utils/timeCheck";

import { IShortMenu } from "../../../types";

import NoImage from "@/assets/no-image.jpg";

interface MenuCardProps {
  menu: IShortMenu;
}

const MenuCard = ({ menu }: MenuCardProps) => {
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
      className="h-[100px] md:h-[120px] 2xl:h-[140px] rounded-2xl w-2xs sm:w-xs md:w-lg lg:w-xl flex gap-4 cursor-pointer"
      onClick={() => handleClickMenu()}
    >
      <img
        src={imageSrc}
        alt={menu.name}
        className="size-[80px] md:size-[100px] 2xl:size-[120px] rounded-2xl"
      />

      <div className="flex flex-col gap-1">
        <span className="text-md md:text-xl font-semibold line-clamp-2">
          {menu.name}
        </span>
        <div className="flex items-center gap-2">
          {menu.discountedPercent > 0 &&
          checkIsInDiscountPeriod(menu.discountedTimePeriod) ? (
            <div className="text-sm md:text-xl font-medium flex gap-2 items-center">
              <span
                className={`${"line-through decoration-2 text-red-500"} text-xs md:text-lg`}
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
      </div>
    </div>
  );
};

export default MenuCard;
