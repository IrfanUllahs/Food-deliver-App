import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import cartReducer from "./features/cartSlice.js";
import bookingReducer from "./features/bookingSlice.js";
import paymentReducer from "./features/paymentSlice.js";
export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    booking: bookingReducer,
    payment: paymentReducer,
  },
});
