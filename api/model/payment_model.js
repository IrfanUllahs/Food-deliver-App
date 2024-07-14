// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  userEmail: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    default: "food Order",
  },
});

export default mongoose.model("Payment", paymentSchema);
