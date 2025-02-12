import { IFullMenu, IRestaurantInfo, IShortMenu } from "../../../types";

// is in open time range
export const checkIsRestaurantOpen = (
  activeTimePeriod: IRestaurantInfo["activeTimePeriod"]
) => {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // Convert current time to total minutes
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // Convert open and close times to total minutes
  const [openHours, openMinutes] = activeTimePeriod.open.split(":").map(Number);
  const openTimeInMinutes = openHours * 60 + openMinutes;

  const [closeHours, closeMinutes] = activeTimePeriod.close
    .split(":")
    .map(Number);
  const closeTimeInMinutes = closeHours * 60 + closeMinutes;

  // Check if the current time is within the range
  return (
    currentTimeInMinutes >= openTimeInMinutes &&
    currentTimeInMinutes <= closeTimeInMinutes
  );
};

export const checkIsInDiscountPeriod = (
  discountedTimePeriod:
    | IShortMenu["discountedTimePeriod"]
    | IFullMenu["discountedTimePeriod"]
) => {
  if (!discountedTimePeriod) return false;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const [beginHour, beginMinute] = discountedTimePeriod.begin
    .split(":")
    .map(Number);
  const [endHour, endMinute] = discountedTimePeriod.end.split(":").map(Number);

  const beginTime = beginHour * 60 + beginMinute;
  const endTime = endHour * 60 + endMinute;

  return currentTime >= beginTime && currentTime <= endTime;
};
