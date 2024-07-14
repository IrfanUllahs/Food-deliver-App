import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  users: [],
  currentUser: null,
  isError: "",
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
      state.users = [];
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser, logout, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
