import { Request, Response, Router } from "express";

import { fetchAllMenus } from "../controllers/restaurantController.ts";

import {
  IRestaurantInfo,
  IRestaurantInfoAndMenusPagination,
} from "../../../types/index.ts";

const API = process.env.LINEMAN_API_GATEWAY;

const router = Router();

router.get("/info/:id", async (req: Request, res: Response) => {
  const restaurantId = req.params.id;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  if (restaurantId) {
    try {
      // * 1 fetch restaurant info
      const restaurantResponse = await fetch(
        `${API}/restaurants/${restaurantId}.json`
      );
      const restaurantInfo =
        (await restaurantResponse.json()) as IRestaurantInfo;

      // * 2 fetch menus
      const slicedMenus = restaurantInfo.menus.slice(startIndex, endIndex);

      const data = await fetchAllMenus(restaurantId, slicedMenus, limit);

      const responseData: IRestaurantInfoAndMenusPagination = {
        info: restaurantInfo,
        menus: data,
        hasMore: endIndex < restaurantInfo.menus.length,
      };

      res.status(200).send({
        ...responseData,
      });
    } catch (error) {
      res.status(500).send({ message: "target api response with 500 status" });
    }
  } else {
    res.status(400).send({ message: "restaurantId is required" });
  }
});

export default router;
