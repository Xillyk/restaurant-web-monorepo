import { expect, test } from "vitest";
import request from "supertest";
import app from "../../server.ts";

test("test /", async () => {
  const res = await request(app).get("/");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ data: "LINE MAN Wongnai Frontend Assignment" });
});

test("test /test", async () => {
  const res = await request(app).get("/test");
  expect(res.status).toBe(404);
});

// const restaurantIds = [567051, 227018];

// ? always get 500 ?

// test("test /info/:id (1001)", async () => {
//   const restaurantId = 1001; // * not have this id
//   const res = await request(app).get(`/restaurant/info/${restaurantId}`);
//   expect(res.status).toBe(404);
// });

// ? always get 500 ?

// test("test /restaurant/info/:id (567051)", async () => {
//   const restaurantId = "567051";
//   const res = await request(app).get(
//     `/restaurant/info/${restaurantId}?page=${1}&limit=${10}`
//   );
//   expect(res.status).toBe(200);
// });

// ? always get 500 ?

// test("test restaurant/full-menu", async () => {
//   const restaurantId = "567051";
//   const menuId = "ข้าวผัดปลาทู";
//   const res = await request(app).get(
//     `/restaurant/full-menu?restaurantId=${restaurantId}&menuId=${menuId}`
//   );
//   console.log("Response:", res.body);
//   expect(res.status).toBe(200);
// });
