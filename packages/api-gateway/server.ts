import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import restaurantRoute from "./src/routes/restaurant.ts";

const app: Application = express();

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.send({ data: "LINE MAN Wongnai Frontend Assignment" }),
);

app.use("/restaurant", restaurantRoute);

export default app;
