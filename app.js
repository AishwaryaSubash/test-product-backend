const express = require("express");
const cors = require("cors");
const userRoutes = require("./user/user");
const productRoutes = require("./product/product");

const app = express();
const router = express.Router();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

// app.use("/user", userRoutes);
// app.use("/product", productRoutes);

app.listen(3000, function () {
  console.log(`Example app listening on port 3000!`);
});

app.get("/", function (req, res) {
  res.send("Hello there!");
});

app.get("/user", function (req, res) {
  res.send("Hello User!");
});

app.get("/product", function (req, res) {
  res.send("Hello product!");
});
