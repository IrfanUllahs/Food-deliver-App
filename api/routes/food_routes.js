import express from "express";
const router = express.Router();
import food_controller from "../controllers/food_controller.js";
router.get("/getfoods/:category", food_controller.getAllRecipes);
export default router;
