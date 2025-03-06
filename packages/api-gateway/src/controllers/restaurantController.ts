import pLimit from "p-limit";
import { IShortMenu } from "../../../types/index.ts";

const API = process.env.LINEMAN_API_GATEWAY;

export const fetchMenu = async (
  restaurantId: string,
  menuName: string,
): Promise<IShortMenu | null> => {
  try {
    const response = await fetch(
      `${API}/restaurants/${restaurantId}/menus/${menuName}/short.json`,
    );

    if (response.status !== 200)
      throw new Error(`Failed to fetch ID: ${menuName}`);

    const data = (await response.json()) as IShortMenu;
    return data;
  } catch (error) {
    console.error(error);
    return null; // Handle failures gracefully
  }
};

export const fetchAllMenus = async (
  restaurantId: string,
  menuNames: string[],
  concurrencyLimit: number = 10,
) => {
  const limit = pLimit(concurrencyLimit);

  const fetchPromises = menuNames.map((menuName) =>
    limit(() => fetchMenu(restaurantId, menuName)),
  );

  const results = await Promise.all(fetchPromises);

  return results.filter((result) => result !== null); // Filter out failed fetches
};
