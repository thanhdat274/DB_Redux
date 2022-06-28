import express from "express";
const route = express.Router();
import { addBillDetail, listBillDetails } from "../controller/billdetail";

route.post("/billdetails", addBillDetail);
route.get("/billdetails/:id", listBillDetails);

export default route;
