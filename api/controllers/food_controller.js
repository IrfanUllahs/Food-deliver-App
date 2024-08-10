import foodModel from "../model/food_model.js";
import mongoose from "mongoose";
const getAllRecipes = async (req, res) => {
  const { category } = req.params;

  try {
    let recipes = [];
    if (category === "all") {
      recipes = await foodModel.find();
    } else if (category == "no") {
      recipes = await foodModel.find().limit(10);
    } else {
      recipes = await foodModel.find({ category });
    }
    if (recipes.length <= 0) {
      return res.status(404).json({ message: "No food" });
    }

    res.status(200).json({
      results: recipes.length,
      recipes,
    });
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await foodModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getRecipesCount = async (req, res) => {
  try {
    const count = await foodModel.aggregate([
      {
        $match: {
          category: { $in: ["chicken", "burger", "dessert", "drink"] },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(count);
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getAllFoods = async (req, res) => {
  try {
    let recipes = [];
    if (req.role) {
      recipes = await foodModel.find();
    } else {
      recipes = await foodModel.find({ userId: req.userId });
    }

    if (recipes.length <= 0) {
      return res.status(404).json({ message: "No food" });
    }

    res.status(200).json({
      results: recipes.length,
      recipes,
    });
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteFood = async (req, res) => {
  const foodId = req.params.id;
  const userId = req.userId;
  const role = req.role;
  try {
    let food;
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    if (role) {
      food = await foodModel.findByIdAndDelete(foodId);
    } else {
      food = await foodModel.findOneAndDelete({
        _id: foodId,
        userId,
      });
    }
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({ message: "Food deleted successfully", food });
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ message: "Something went wrong" });
  }
};
const updateFood = async (req, res) => {
  const foodId = req.params.id;
  const userId = req.userId;
  const role = req.role;

  console.log(req.body);
  try {
    let food;
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    if (role) {
      food = await foodModel.findByIdAndUpdate(foodId, req.body, { new: true });
    } else {
      food = await foodModel.findOneAndUpdate(
        { _id: foodId, userId },
        req.body,
        { new: true }
      );
    }
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({ message: "Food updated successfully", food });
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ message: "Something went wrong" });
  }
};
const addFood = async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  try {
    if (role) {
      const food = await foodModel.create(req.body);
      res.status(200).json({ message: "Food added successfully", food });
      return;
    } else {
      const food = await foodModel.create({ ...req.body, userId });
      res.status(200).json({ message: "Food added successfully", food });
      return;
    }
  } catch (err) {
    console.log({ error: err });
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default {
  getAllRecipes,
  getRecipe,
  getRecipesCount,
  getAllFoods,
  deleteFood,
  updateFood,
  addFood,
};
