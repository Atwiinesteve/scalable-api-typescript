// imports
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../database/db.connect";
import { productSchema } from "../schemas/product-schema";

// create product.
export async function createProduct(request: Request, response: Response) {
  try {
    const { name, price } = request.body;
    if (!name || !price) {
      return response
        .status(400)
        .json({ message: "Name and price are required" });
    }
    const product = await db
      .insert(productSchema)
      .values({ name, price })
      .returning();
    response.status(201).json({
      success: true,
      statusCode: 201,
      message: `Product created.`,
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
}

// get all products.
export async function getProducts(request: Request, response: Response) {
  try {
    const products = await db
      .select({
        id: productSchema.id,
        name: productSchema.name,
        price: productSchema.price,
      })
      .from(productSchema);
    if (products.length < 0) {
      response.status(404).json({
        success: false,
        statusCode: 404,
        message: `No products found.`,
        data: products,
      });
    }
    response.status(200).json({
      success: true,
      statusCode: 200,
      message: `Products created.`,
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
}

// get product by id.
export async function getProduct(request: Request, response: Response) {
  try {
    const productId = request.params.id;
    const product = await db
      .select({
        id: productSchema.id,
        name: productSchema.name,
        price: productSchema.price,
      })
      .from(productSchema)
      .where(eq(productSchema.id, Number(productId)));
    if (!product.length) {
      response.status(404).json({
        success: false,
        statusCode: 404,
        message: `No product with id: ${productId} was found.`,
        data: product,
      });
    }
    response.status(200).json({
      success: true,
      statusCode: 200,
      message: `${Array(product).length} product.`,
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
}

// update product.
export async function updateProduct(request: Request, response: Response) {
  try {
    const { name, price } = request.body;
    const productId = request.params.id;

    if (!name || !price) {
      return response.status(400).json({
        success: false,
        statusCode: 400,
        message: "Name and price are required.",
      });
    }

    const result = await db
      .update(productSchema)
      .set({ name, price })
      .where(eq(productSchema.id, Number(productId)));

    if (result.rowCount === 0) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: `Product with ID ${productId} not found.`,
      });
    }

    const updatedProduct = await db
      .select()
      .from(productSchema)
      .where(eq(productSchema.id, Number(productId)));

    response.status(200).json({
      success: true,
      statusCode: 200,
      message: `Product with ID ${productId} updated successfully.`,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
}

// delete product by id.
export async function deleteProduct(request: Request, response: Response) {
  try {
    const productId = request.params.id;
    const deletedProduct = await db
      .delete(productSchema)
      .where(eq(productSchema.id, Number(productId)));
    if (deletedProduct.rowCount === 0) {
      return response.status(400).json({
        success: false,
        statusCode: 400,
        message: `Product not deleted/its ID not found.`,
      });
    }
    response.status(200).json({
      success: true,
      statusCode: 200,
      message: `Product deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
  }
}
