import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // You forgot to import this

const initialState = {
  users: [] // Should always be an array
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      // Always store array of users
      state.users = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    removeuser: (state, action) => {
      state.users = null
    },
  }
});

export default userSlice.reducer;
export const { loadUser, removeuser } = userSlice.actions;


