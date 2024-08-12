import express from "express";
const router = express.Router();
import order_controller from "../controllers/order_controller.js";
import auth from "../middlewares/auth.js";
router.post("/", auth, order_controller.createOrder);
router.get("/getorders", auth, order_controller.getOrders);
router.patch("/updateorder/:id", auth, order_controller.updateOrder);
export default router;
