import express from "express";
const route = express.Router();
import {
  addCategory,
  listCategory,
  categoryDetail,
  categoryRemove,
  categoryUpdate,
} from "../controller/categories";

route.get("/categories", listCategory);
route.post("/categories", addCategory);
route.get("/categories/:id", categoryDetail);
route.delete("/categories/:id", categoryRemove);
route.put("/categories/:id", categoryUpdate);

export default route;
