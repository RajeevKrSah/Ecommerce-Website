import axios from "axios";

export const fetchCartAPI = async (userId, token) => {
  
  try {
    const response = await axios.get(`/api/cart/find/${userId}`, {
      headers: { token: `Bearer ${token}` },
    });
    const cartData = response.data.products;
    return cartData;
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message || error
    );
    throw new Error(
      error.response?.data ||
        "An unexpected error occurred while fetching the cart."
    );
  }
};

export const addToCartAPI = async (userId, products, token) => {
  
  try {
    const response = await axios.post(
      "/api/cart",
      { userId, products: [products] },
      { headers: { token: `Bearer ${token}` } }
    );
    
    return response.data.products;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error.response?.data || "An error occurred while adding to the cart.";
  }
};

export const removeFromCartAPI = async (userId, _id, token) => {
  
  try {
    const response = await axios.delete(`/api/cart/${userId}/product/${_id}`, {
      headers: { token: `Bearer ${token}` },
    });
    const updatedCart = response.data.cart.products;
    return updatedCart;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw (
      error.response?.data || "An error occurred while removing from the cart."
    );
  }
};
