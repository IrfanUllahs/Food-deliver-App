import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Payment: "",
  allPayments: [],
};

const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.Payment = action.payload;
    },
    setAllPayments: (state, action) => {
      state.allPayments = action.payload;
    },
    updatePayment: (state, action) => {
      state.allPayments = state.allPayments.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
  },
});

export const { setPayment, setAllPayments, updatePayment } = payment.actions;
export default payment.reducer;
