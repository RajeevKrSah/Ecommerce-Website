import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // To hold the logged-in user details
  isLoading: false, // To handle loading state
  error: null, // To capture any error messages
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload; // Set the logged-in user's data
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Capture the error message
    },
    logout: (state) => {
      state.currentUser = null; // Clear the logged-in user data
      state.error = null; // Reset any error messages
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  loginSlice.actions;

export default loginSlice.reducer;
