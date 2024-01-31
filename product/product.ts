import express from "express";
import { getAllProducts, addProduct, editProduct } from "./product.service";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.status(201).json(products);
});
productRouter.post("/add", async (req, res) => {
  const product = await addProduct(req.body);
  res.status(201).json(product);
});
productRouter.post("/edit", async (req, res) => {
  const product = await editProduct(req.body);
  res.status(201).json(product);
});

export default productRouter;
