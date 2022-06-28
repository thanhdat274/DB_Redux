import express from "express";
const route = express.Router();

route.get("/", (req, res) => {
  res.send("<h1>Trang chu </h1>");
});

export default route;
