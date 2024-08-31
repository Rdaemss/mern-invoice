import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // If the user exists we return a user otherwise we return null as initial state
  user: user ? user : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserToken = (state) => state.auth.user?.accessToken;
