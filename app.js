const express = require("express");
const app = express();
import mongoose from "mongoose";

import homeRoute from "./routers/home";
import productRoute from "./routers/product";
import categoryRoute from "./routers/categories";
import authRoute from "./routers/auth";
import billRoute from "./routers/bill";
import billDetailRoute from "./routers/billdetail";
import cors from "cors";

app.use(express.json());
app.use(cors());
app.use(homeRoute);
app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", authRoute);
app.use("/api", billRoute);
app.use("/api", billDetailRoute);

mongoose
  .connect("mongodb://127.0.0.1:27017/we503")
  .then(() => {
    console.log("thanh cong");
  })
  .catch(() => {
    console.log("ko thanh cong");
  });

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
