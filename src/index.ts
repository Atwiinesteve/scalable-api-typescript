import express, { Request, Response } from "express";
import productsRouter from "./routes/products.route";

const app = express();
const PORT = process.env.PORT || 4040;

app.use("/products", productsRouter);

app.get("/test", (request: Request, response: Response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
