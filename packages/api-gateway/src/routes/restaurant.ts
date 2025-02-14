import { Request, Response, Router } from "express";

import { fetchAllMenus } from "../controllers/restaurantController.ts";

import {
  IFullMenu,
  IRestaurantInfo,
  IRestaurantInfoAndMenusPagination,
} from "../../../types/index.ts";

const API = process.env.LINEMAN_API_GATEWAY;
// * for test
const RESTAURANT_OPEN_TIME = process.env.RESTAURANT_OPEN_TIME;
const RESTAURANT_CLOSE_TIME = process.env.RESTAURANT_CLOSE_TIME;
const DISCOUNT_BEGIN_TIME = process.env.DISCOUNT_BEGIN_TIME;
const DISCOUNT_END_TIME = process.env.DISCOUNT_END_TIME;

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

      const allMenuLength = restaurantInfo.menus.length;

      // no need to send now
      restaurantInfo.menus = [];

      // ?: set menu discount, and period
      const editedMenuData = data.map((menu) => ({
        ...menu,
        discountedPercent: 10,
        discountedTimePeriod: {
          begin: DISCOUNT_BEGIN_TIME ?? "00:00",
          end: DISCOUNT_END_TIME ?? "00:00",
        },
      }));

      // ?: set restaurant open, close time
      restaurantInfo.activeTimePeriod = {
        open: RESTAURANT_OPEN_TIME ?? "00:00",
        close: RESTAURANT_CLOSE_TIME ?? "00:00",
      };

      const responseData: IRestaurantInfoAndMenusPagination = {
        info: restaurantInfo,
        menus: editedMenuData,
        hasMore: endIndex < allMenuLength,
      };

      res.status(200).send({
        ...responseData,
      });
    } catch (error) {
      res.status(500).send({ message: `target api response with error` });
    }
  } else {
    res.status(400).send({ message: "restaurantId is required" });
  }
});

router.get("/full-menu", async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.query.restaurantId as string);
  const menuId = req.query.menuId as string;

  if (restaurantId && menuId) {
    try {
      // * 1 fetch restaurant info
      const menuResponse = await fetch(
        `${API}/restaurants/${restaurantId}/menus/${menuId}/full.json`
      );
      const menuData = (await menuResponse.json()) as IFullMenu;

      // ?: set discount, and period
      const editedMenuData = {
        ...menuData,
        discountedPercent: 10,
        discountedTimePeriod: {
          begin: DISCOUNT_BEGIN_TIME ?? "00:00",
          end: DISCOUNT_END_TIME ?? "00:00",
        },
      };

      res.status(200).send({
        ...editedMenuData,
      });
    } catch (error) {
      res.status(500).send({ message: `target api response with error` });
    }
  } else {
    res.status(400).send({ message: "restaurantId | menuId is required" });
  }
});

router.get("/top-menu", async (req: Request, res: Response) => {
  const restaurantId = req.query.restaurantId as string;
  const limit = parseInt(req.query.limit as string) || 3;

  if (restaurantId) {
    try {
      // * 1 fetch restaurant info
      const restaurantResponse = await fetch(
        `${API}/restaurants/${restaurantId}.json`
      );
      const restaurantInfo =
        (await restaurantResponse.json()) as IRestaurantInfo;

      // * 2 fetch all menus
      const menus = await fetchAllMenus(restaurantId, restaurantInfo.menus, 20);

      // * sort top sold menus
      const filterPopularMenus = menus
        .sort((a, b) => b.sold - a.sold)
        .slice(0, limit);

      // ?: set discount, and period
      const editedMenuData = filterPopularMenus.map((menu) => ({
        ...menu,
        discountedPercent: 10,
        discountedTimePeriod: {
          begin: DISCOUNT_BEGIN_TIME ?? "00:00",
          end: DISCOUNT_END_TIME ?? "00:00",
        },
      }));

      res.status(200).send(editedMenuData);
    } catch (error) {
      res.status(500).send({ message: `target api response with error` });
    }
  } else {
    res.status(400).send({ message: "restaurantId is required" });
  }
});

export default router;
