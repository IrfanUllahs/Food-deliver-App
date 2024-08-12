import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth_routes.js";
import foodRouter from "./routes/food_routes.js";
import userRouter from "./routes/user_routes.js";
import cartRouter from "./routes/cart_routes.js";
import paymentRouter from "./routes/payment_routes.js";
import bookingRouter from "./routes/booking_routes.js";
import orderRouter from "./routes/order_routes.js";
// import messageRouter from "./routes/message_routes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
let DBSTRINGS = process.env.DBSTRINGS;
console.log(DBSTRINGS, "db url is here");

mongoose
  .connect(DBSTRINGS)
  .then(() => {
    console.log("DB connected Successfully");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

app.use(
  // cors()
  cors({
    origin: ["https://food-delivery-app-six-khaki.vercel.app/"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/order", orderRouter);
app.use("/", (req, res) => {
  res.json({ message: "deploy" });
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
