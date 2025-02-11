import { IRestaurantInfo } from "../../../types";

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
