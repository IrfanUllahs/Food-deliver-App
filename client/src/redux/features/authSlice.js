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
      localStorage.removeItem("fooduser");
      state.users = [];
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("fooduser", JSON.stringify(action.payload));
    },
  },
});

export const { setUser, logout, setCurrentUser, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
