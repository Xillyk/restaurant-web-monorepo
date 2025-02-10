import { IRestaurantInfoAndMenusPagination } from "../../../types";

const API_GATEWAY_ENDPOINT = import.meta.env.VITE_API_GATEWAY_ENDPOINT;
// get restaurant info
export const getRestaurantInfoAndMenus = async (
  restaurantId: string,
  page: number,
  limit: number
) => {
  try {
    const response = await fetch(
      `${API_GATEWAY_ENDPOINT}/restaurant/info/${restaurantId}?page=${page}&limit=${limit}`
    );
    const data: IRestaurantInfoAndMenusPagination = await response.json();
    return data;
  } catch (error) {
    console.log("🚀 ~ getRestaurantInfo ~ error:", error);
  }
};
