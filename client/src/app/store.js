import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../features/auth/signupSlice.js';
import loginReducer from '../features/auth/loginSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
export const store = configureStore({
  reducer: {
    signup: signupReducer, 
    login: loginReducer,
    cart: cartReducer,
  },
});

export default store;
