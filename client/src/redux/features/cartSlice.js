import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: "",
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    setAllCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
    updateCartProducts: (state, action) => {
      state.cartProducts = state.cartProducts.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    deleteCartProducts: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const {
  setCartProducts,
  setAllCartProducts,
  updateCartProducts,
  deleteCartProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
