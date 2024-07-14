import foodModel from "../model/food_model.js";

const getAllRecipes = async (req, res) => {
  const { category } = req.params;

  try {
    let recipes = [];
    if (category === "all") {
      recipes = await foodModel.find();
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
export default { getAllRecipes };
