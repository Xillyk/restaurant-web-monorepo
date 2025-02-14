import app from "./server.ts";

const port = process.env.API_PORT || 3002;

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}

export default app;
