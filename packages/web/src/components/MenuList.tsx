import React from "react";
import { IShortMenu } from "../../../types";
import MenuCard from "./MenuCard";

interface MenuListProps {
  menuList: IShortMenu[];
  isRecommendList?: boolean;
}

const MenuList = ({ menuList, isRecommendList }: MenuListProps) => {
  return (
    <div>
      {menuList.map((menu, index) => (
        <MenuCard menu={menu} key={index} isRecommendList={isRecommendList} />
      ))}
    </div>
  );
};

export default MenuList;
