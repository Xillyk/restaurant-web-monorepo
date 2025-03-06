import { checkIsInDiscountPeriod } from "./timeCheck";

import { IFullMenu, IShortMenu } from "../../../types";

export const getMenuPrice = (menu: IShortMenu | IFullMenu) => {
  if (
    menu.discountedPercent > 0 &&
    checkIsInDiscountPeriod(menu.discountedTimePeriod)
  ) {
    return Math.round(
      menu.fullPrice - (menu.fullPrice * menu.discountedPercent) / 100,
    );
  }
  // no discount || not in discount period will return full price
  return menu.fullPrice;
};
