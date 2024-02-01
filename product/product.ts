import express, { Router, Request, Response } from "express";
import { getAllProducts, addProduct, editProduct } from "./product.service";
// import verifyToken from "../middlewares/auth";
const verifyToken = require("../middlewares/auth");
const productRouter: Router = express.Router();

productRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.status(201).json(products);
});

productRouter.post("/add", verifyToken, async (req: Request, res: Response) => {
  const product = await addProduct(req.body);
  res.status(201).json(product);
});

productRouter.post(
  "/edit",
  verifyToken,
  async (req: Request, res: Response) => {
    const product = await editProduct(req.body);
    res.status(201).json(product);
  }
);

export default productRouter;
