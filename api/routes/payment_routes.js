import express from "express";
const router = express.Router();
import payment_controller from "../controllers/payment_controller.js";
import auth from "../middlewares/auth.js";
router.post("/", auth, payment_controller.createPayment);
router.get("/getpayments", auth, payment_controller.getPayments);
export default router;
