import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartAPI, addToCartAPI, removeFromCartAPI } from "./cartAPI";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, products, token }, thunkAPI) => {
    try {
      const updatedCart = await addToCartAPI(userId, products, token);
      return updatedCart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          error.message ||
          "Failed to remove item from cart."
      );
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, token }, thunkAPI) => {
    try {
      const cartResponse = await fetchCartAPI(userId, token);
      return cartResponse;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to add item to cart."
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, _id, token }, thunkAPI) => {
    try {
      const updatedCart = await removeFromCartAPI(userId, _id, token);
      return updatedCart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to add item to cart."
      );
    }
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
