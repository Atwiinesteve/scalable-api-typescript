import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "../controllers/products.controller";
const productsRouter = express.Router();

// create product
productsRouter.post("/create", createProduct);
// get all products
productsRouter.get("/", getProducts);
// get product by id
productsRouter.get("/:id", getProduct);
// update product
productsRouter.put("/:id", updateProduct);
// delete product
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
