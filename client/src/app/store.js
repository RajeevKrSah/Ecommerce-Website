import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../features/auth/signupSlice.js';
import loginReducer from '../features/auth/loginSlice.js'
export const store = configureStore({
  reducer: {
    signup: signupReducer, 
    login: loginReducer,
  },
});

export default store;
