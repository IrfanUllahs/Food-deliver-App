import auth_controller from "../controllers/auth_controller.js";
import express from "express";
const router = express.Router();

router.post("/google", auth_controller.googleSignIn);
router.post("/register", auth_controller.register);
router.post("/login", auth_controller.login);
export default router;
