import React from "react";
import { IShortMenu } from "../../../types";
import MenuCard from "./MenuCard";

interface MenuListProps {
  menuList: IShortMenu[];
}

const MenuList = ({ menuList }: MenuListProps) => {
  return (
    <div>
      {menuList.map((menu, index) => (
        <MenuCard menu={menu} key={index} />
      ))}
    </div>
  );
};

export default MenuList;
