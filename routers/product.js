import express from "express";
const route = express.Router();
import {
  addProduct,
  listProduct,
  productDetail,
  productRemove,
  productUpdate,
} from "../controller/products";
import { checkUser } from "../controller/user";
import { isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";

route.get("/products", listProduct);
// route.post("/products/:userId", requiredSignin, isAuth, isAdmin, addProduct);
route.post("/products/:userId", requiredSignin, isAuth, addProduct);
route.get("/products/:id", productDetail);
route.delete("/products/:id", productRemove);
route.put("/products/:id", productUpdate);

route.param("userId", checkUser);

export default route;
