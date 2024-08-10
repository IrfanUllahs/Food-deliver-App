import Cart from "../model/cart_model.js";
import foodModel from "../model/food_model.js";
import mongoose from "mongoose";
const addToCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  console.log(userId);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const product = await foodModel.findById(id);
    // check the id first is valid mongodb object id or not
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const existingCartItem = await Cart.findOne({
      productId: id,
      userId: userId,
    });
    console.log(existingCartItem);
    if (existingCartItem) {
      // give error response
      return res.status(400).send({ message: "Product already in cart" });
    }
    const cartItem = await Cart.create({
      productId: id,
      quantity: 1,
      price: product.price,
      userId: userId,
    });
    res.send(cartItem);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error adding product to cart" });
  }
};
const getCartProducts = async (req, res) => {
  const userId = req.userId;
  try {
    const cartItems = await Cart.find({ userId: userId }).populate("productId");
    // if (cartItems.length === 0) {
    //   console.log(cartItems);
    //   return res.status(404).send({ message: "Cart is empty" });
    // }
    res.status(200).send(cartItems);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving cart items" });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const product = await Cart.findOneAndDelete({ _id: id, userId: userId });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error deleting product" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  console.log(req.body);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const product = await Cart.findOneAndUpdate(
      { _id: id, userId: userId },
      { $set: { quantity: req.body.quantity } },
      { new: true }
    ).populate("productId");

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error updating product" });
  }
};
const getLengthOfcart = async (req, res) => {
  const userId = req.userId;
  try {
    const cartItems = await Cart.find({
      userId: req.userId,
    });
    res.status(200).json(cartItems.length);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving cart items" });
  }
};
export default {
  addToCart,
  getCartProducts,
  deleteProduct,
  updateProduct,
  getLengthOfcart,
};
