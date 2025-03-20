import { Request, Response } from "express";

export function createProduct(request: Request, response: Response) {
  try {
    response.status(200).json({ message: `Product created..` });
  } catch (error) {
    console.log(error);
  }
}

export function getProducts(request: Request, response: Response) {
  try {
    response.status(200).json({ message: `All products.` });
  } catch (error) {
    console.log(error);
  }
}

export function getProduct(request: Request, response: Response) {
  try {
    const productId = request.params.id;
    response.status(200).json({ message: `Product id: ${productId}` });
  } catch (error) {
    console.log(error);
  }
}

export function updateProduct(request: Request, response: Response) {
  try {
    response.status(200).json({ message: `Product updated..` });
  } catch (error) {
    console.log(error);
  }
}

export function deleteProduct(request: Request, response: Response) {
  try {
    response.status(200).json({ message: `Product deleted..` });
  } catch (error) {
    console.log(error);
  }
}
