import { IRestaurantInfo } from "../../../types";

const API_GATEWAY_ENDPOINT = import.meta.env.VITE_API_GATEWAY_ENDPOINT;
// get restaurant info
export const getRestaurantInfo = async (id: string) => {
  try {
    const response = await fetch(
      `${API_GATEWAY_ENDPOINT}/restaurant/info/${id}/10`
    );
    const data = await response.json();
    return data.data as IRestaurantInfo;
  } catch (error) {
    console.log("🚀 ~ getRestaurantInfo ~ error:", error);
  }
};
