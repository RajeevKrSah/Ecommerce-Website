import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../features/auth/signupSlice.js';

export const store = configureStore({
  reducer: {
    signup: signupReducer, 
  },
});

export default store;
