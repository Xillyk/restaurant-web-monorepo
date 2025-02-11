import React from "react";
import { IShortMenu } from "../../../types";
import MenuCard from "./MenuCard";

interface IMenuList {
  menuList: IShortMenu[];
}

const MenuList = ({ menuList }: IMenuList) => {
  return (
    <div>
      {menuList.map((menu, index) => (
        <MenuCard menu={menu} key={index} />
      ))}
    </div>
  );
};

export default MenuList;
