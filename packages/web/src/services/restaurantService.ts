import {
  IFullMenu,
  IRestaurantInfo,
  IRestaurantInfoAndMenusPagination,
  IShortMenu,
} from "../../../types";

const API_GATEWAY_ENDPOINT = import.meta.env.VITE_API_GATEWAY_ENDPOINT;
// get restaurant info
export const getRestaurantInfoAndMenus = async (
  restaurantId: number,
  page: number,
  limit: number,
) => {
  try {
    const response = await fetch(
      `${API_GATEWAY_ENDPOINT}/restaurant/info/${restaurantId}?page=${page}&limit=${limit}`,
    );
    const data: IRestaurantInfoAndMenusPagination = await response.json();
    return data;
  } catch (error) {
    console.log("🚀 ~ getRestaurantInfo ~ error:", error);
  }
};

// get full menu
export const getFullMenu = async (
  restaurantId: IRestaurantInfo["id"],
  menuId: IShortMenu["id"],
) => {
  try {
    const response = await fetch(
      `${API_GATEWAY_ENDPOINT}/restaurant/full-menu?restaurantId=${restaurantId}&menuId=${menuId}`,
    );
    const data: IFullMenu = await response.json();
    return data;
  } catch (error) {
    console.log("🚀 ~ getFullMenu ~ error:", error);
  }
};

// get top recommend menus
export const getTopRecommendMenus = async (
  restaurantId: IRestaurantInfo["id"],
  limit: number,
) => {
  try {
    const response = await fetch(
      `${API_GATEWAY_ENDPOINT}/restaurant/top-menu?restaurantId=${restaurantId}&limit=${limit}`,
    );
    const data: IShortMenu[] = await response.json();
    return data;
  } catch (error) {
    console.log("🚀 ~ getFullMenu ~ error:", error);
  }
};
