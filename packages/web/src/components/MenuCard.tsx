import React from "react";
import { IShortMenu } from "../../../types";
import { useRestaurant } from "@/contexts/RestaurantContext";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

interface MenuCardProps {
  menu: IShortMenu;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const { setSelectedMenuId } = useRestaurant();
  const { setIsOpenBottomSheet } = useBottomSheet();

  const handleClickMenu = () => {
    setSelectedMenuId(menu.id);
    setIsOpenBottomSheet(true);
  };

  return (
    <div
      className="h-[100px] md:h-[120px] 2xl:h-[140px] rounded-2xl w-full flex gap-4 cursor-pointer"
      onClick={() => handleClickMenu()}
    >
      <img
        src={menu.thumbnailImage}
        alt={menu.name}
        className="size-[80px] md:size-[100px] 2xl:size-[120px] rounded-2xl"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = "/assets/no-image.png";
        }}
      />

      <div className="flex flex-col">
        <span className="text-md md:text-xl font-semibold">{menu.name}</span>
        <span className="text-sm md:text-lg font-medium">{`${menu.fullPrice} บาท`}</span>
      </div>
    </div>
  );
};

export default MenuCard;
