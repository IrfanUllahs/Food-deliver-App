import express from "express";
const router = express.Router();
import User_controller from "../controllers/User_controller.js";
router.get("/:userId", User_controller.getUser);
router.get("/getallusers/:currentuserid", User_controller.getUsers);
router.patch("/update/:id", User_controller.updateUser);
router.delete("/deleteuser/:id", User_controller.deleteUser);
export default router;
