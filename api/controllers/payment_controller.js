import paymentModel from "../model/payment_model.js";
import cartModel from "../model/cart_model.js";
import bookingModel from "../model/booking_model.js";
import mongoose from "mongoose";
//suggest name for this
const createPayment = async (req, res) => {
  const { cardNumber, expiryDate, cvc, amount, userEmail, payment, id } =
    req.body;
  console.log(req.body, "req.body");
  const userId = req.userId;
  const bookingId = id;

  try {
    if (!cardNumber || !expiryDate || !cvc || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const paymentObj = new paymentModel({
      cardNumber,
      expiryDate,
      cvc,
      amount,
      userEmail,
      payment,
      userId,
    });
    await paymentObj.save();
    if (payment === "Food Order") {
      res.status(200).json({ message: "Payment successful", paymentObj });
    } else {
      if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      let booking = await bookingModel.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      if (booking.paid) {
        return res.status(400).json({ message: "Booking already paid" });
      }
      booking.paid = true;
      await booking.save();
      res.status(200).json(booking);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getPayments = async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  try {
    let payments;
    if (role) {
      payments = await paymentModel.find();
    } else {
      payments = await paymentModel.find({ userId });
    }
    res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default { createPayment, getPayments };
