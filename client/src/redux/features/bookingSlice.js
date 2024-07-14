import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: "",
  bookingProducts: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingProducts: (state, action) => {
      state.bookingProducts.push(action.payload);
    },
    setAllBookingProducts: (state, action) => {
      state.bookingProducts = action.payload;
    },
    updateBookingProducts: (state, action) => {
      console.log(action.payload);
      state.bookingProducts = state.bookingProducts.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    deleteBookingProducts: (state, action) => {
      state.bookingProducts = state.bookingProducts.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const {
  setAllBookingProducts,
  setBookingProducts,
  updateBookingProducts,
  deleteBookingProducts,
} = bookingSlice.actions;
export default bookingSlice.reducer;
