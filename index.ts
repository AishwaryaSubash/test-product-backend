import express from "express";
import cors from "cors";
import productRouter from "./product/product";
// import userRoutes from "./user/user";
// import productRoutes from "./product/product";

const app = express();
const router = express.Router();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

// app.use("/user", userRoutes);
app.use("/product", productRouter);

app.listen(3000, function () {
  console.log(`Example app listening on port 3000!`);
});

app.get("/", function (req, res) {
  res.send("Hello there!");
});

app.get("/user", function (req, res) {
  res.send("Hello user!");
});

app.get("/product", function (req, res) {
  res.send("Hello product!");
});

app.get("/product/add", function (req, res) {
  const product = {
    name: req.body.product_name,
    desc: req.body.product_description,
    status: req.body.status,
    price: req.body.price,
  };
  res.send(`Hello product ${product.name}!`);
});
