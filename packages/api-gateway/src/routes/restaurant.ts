import { Request, Response, Router } from "express";
import pLimit from "p-limit";

import { IRestaurantInfo } from "../../../types/index";
import { loadPLimit } from "../services/loadLimit";

const router = Router();

const API = process.env.LINEMAN_API_GATEWAY;

router.get("/info/:id/:size", async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  const menusSize = req.params.size;
  console.log("🚀 ~ router.post ~ menusSize:", menusSize);

  // console.log("🚀 ~ router.get ~ param:", restaurantId);

  if (restaurantId) {
    try {
      // * 1 fetch restaurant info
      const restaurantResponse = await fetch(
        `${API}/restaurants/${restaurantId}.json`
      );
      const restaurantInfo = await restaurantResponse.json();
      console.log("🚀 ~ router.get ~ restaurantInfo:", restaurantInfo);

      // * 2 fetch menus

      // const menusResponse = await fetch(
      //   `${API}/restaurants/${restaurantId}/menus/:menuName/short.json`
      // );

      // Example usage
      // const menuIds = Array.from({ length: 120 }, (_, i) => `id-${i + 1}`); // Example 120 IDs

      // fetchAllItems(ids, 10)
      //   .then((data) => console.log("Fetched data:", data))
      //   .catch((error) => console.error("Error fetching data:", error));

      //
      res.status(200).send({ restaurantInfo });
    } catch (error) {
      res.status(500).send({ message: "target api response with 500 status" });
    }
  } else {
    res.status(400).send({ message: "restaurantId is required" });
  }
});

const fetchMenu = async (
  restaurantId: string,
  menuId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${API}/restaurants/:restaurantId/menus/:menuName/short.json`
    );
    console.log("🚀 ~ fetchItem ~ response:", response);

    // if (!response.ok) throw new Error(`Failed to fetch ID: ${id}`);
    // return response.json();
  } catch (error) {
    console.error(error);
    return null; // Handle failures gracefully
  }
};

const fetchAllItems = async (
  restaurantId: string,
  menuIds: string[],
  concurrencyLimit: number = 10
) => {
  const pLimit = await loadPLimit();
  const limit = pLimit(concurrencyLimit);

  const fetchPromises = menuIds.map((menuId) =>
    limit(() => fetchMenu(restaurantId, menuId))
  );

  const results = await Promise.all(fetchPromises);

  return results.filter((result) => result !== null); // Filter out failed fetches
};

export default router;
