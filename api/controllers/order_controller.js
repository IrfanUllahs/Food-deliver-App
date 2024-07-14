import mongoose from "mongoose";
import orderModel from "../model/order_model.js";
import cartModle from "../model/cart_model.js";
import { ObjectId } from "mongodb";
const createOrder = async (req, res) => {
  const userId = req.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }
    const cartItems = await cartModle.find({ userId: userId });
    if (cartItems.length === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    }
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const products = cartItems.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const order = new orderModel({
      userId: userId,
      products: products,
      totalPrice: totalPrice,
    });
    await order.save();
    await cartModle.deleteMany({ userId: userId });
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error creating order" });
  }
};
const getOrders = async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  try {
    let orders;
    if (role) {
      orders = await orderModel.find();
    } else {
      orders = await orderModel.find({ userId });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default { createOrder, getOrders };
