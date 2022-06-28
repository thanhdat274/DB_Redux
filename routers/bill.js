import express from "express";
const route = express.Router();
import {
  addBill,
  listBill,
  listBillDetails,
  removeBill,
  updateBillStatus,
} from "../controller/bill";

route.get("/bills", listBill);
route.get("/bills/:id", listBillDetails);
route.post("/bills", addBill);
route.put("/bills/:id", updateBillStatus);
route.delete("/bills/:id", removeBill);

export default route;
