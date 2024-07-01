import express from "express";
import cors from "cors";
import productRouter from "./product/product";
import userRouter from "./user/user";
import dotenv from "dotenv";

const app = express();
const router = express.Router();
dotenv.config();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});

app.get("/", function (req, res) {
  res.send("Hello there!");
});
