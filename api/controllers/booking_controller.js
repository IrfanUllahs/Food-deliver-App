import booking_model from "../model/booking_model.js";
import mongoose from "mongoose";

const generatePrice = (guests) => {
  const basePrice = 50;
  return basePrice * guests;
};
const booking = async (req, res) => {
  const { date, time, guests, name, phone, email } = req.body;
  const userId = req.userId;
  const price = generatePrice(guests);

  try {
    const newBooking = new booking_model({
      date,
      time,
      guests,
      name,
      phone,
      email,
      price,
      userId,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getLengthOfbooking = async (req, res) => {
  const userId = req.userId;
  try {
    const bookingItems = await booking_model.find({
      userId: req.userId,
    });
    res.status(200).json(bookingItems.length);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving booking items" });
  }
};

const getBooking = async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  try {
    let bookingItems;
    if (role) {
      bookingItems = await booking_model.find();
    } else {
      bookingItems = await booking_model.find({
        userId,
      });
    }
    res.status(200).json(bookingItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving booking items" });
  }
};
const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  console.log(bookingId, "bookingId");
  const userId = req.userId;
  const role = req.role;
  try {
    let booking;
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    if (role) {
      booking = await booking_model.findByIdAndDelete(bookingId);
    } else {
      booking = await booking_model.findOneAndDelete({
        _id: bookingId,
        userId,
      });
    }
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const updateBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    let booking = await booking_model.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.paid) {
      return res.status(400).json({ message: "Booking already paid" });
    }
    booking.paid = true;
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getSingleBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.userId;
  const role = req.role;
  try {
    let booking;
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    if (role) {
      booking = await booking_model.findById(bookingId);
    } else {
      booking = await booking_model.findOne({
        _id: bookingId,
        userId,
      });
    }
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default {
  booking,
  getLengthOfbooking,
  getBooking,
  deleteBooking,
  updateBooking,
  getSingleBooking,
};
