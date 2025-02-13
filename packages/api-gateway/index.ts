import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import restaurantRoute from "./src/routes/restaurant.ts";

const app: Application = express();
const port = process.env.API_PORT || 3002;

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/restaurant", restaurantRoute);

app.get("/", (req, res) =>
  res.send({ data: "LINE MAN Wongnai Frontend Assignment" })
);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}

export default app;
