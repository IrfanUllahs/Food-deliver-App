// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  paid: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: String,
    default: "booking",
  },
});

export default mongoose.model("bookings", bookingSchema);
