import express from "express";
const router = express.Router();
import {
  signin,
  signup,
  getUsers,
  removeUser,
  getUserDetails,
  updateUser,
} from "../controller/auth";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getUsers);
router.delete("/users/:id", removeUser);
router.get("/users/:id", getUserDetails);
router.put("/users/:id", updateUser);

export default router;
