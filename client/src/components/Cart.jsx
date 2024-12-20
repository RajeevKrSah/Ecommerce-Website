import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";
const APIUrl = import.meta.env.VITE_API_URL;
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [cartError, setCartError] = useState(null);
  const [productError, setProductError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const { token, userId } = useAuthToken();

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      setCartLoading(true);
      setCartError(null);
      try {
        const response = await axios.get(`${APIUrl}/api/cart/find/${userId}`, {
          headers: { token: `Bearer ${token}` },
        });
        const cartData = response.data;

        // Extract product IDs from cart items
        const productIds = cartData.flatMap((item) =>
          item.products.map((product) => product.productId)
        );

        setCartItems(productIds);
      } catch (error) {
        setCartError("Failed to load cart items.");
      } finally {
        setCartLoading(false);
      }
    };

    if (userId && token) fetchCartItems();
  }, [userId, token]);

  // Fetch product details for cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      setProductDetails([]);
      return;
    }

    const fetchProductDetails = async () => {
      setProductLoading(true);
      setProductError(null);
      try {
        const productDetailPromises = cartItems.map((id) =>
          axios.get(`${APIUrl}/api/products/find/${id}`)
        );
        await Promise.all(productDetailPromises)
          .then((responses) => {
            const products = responses.map((response) => response.data);
            setProductDetails(products);
          })
          .catch((error) => {
            console.error("Error fetching product details:", error);
          });
      } catch (error) {
        setProductError("Failed to load product details.");
      } finally {
        setProductLoading(false);
      }
    };

    fetchProductDetails();
  }, [cartItems]);

  const handleRemoveBtn = async (productId) => {
    try {
      await axios.delete(`${APIUrl}/api/cart/${productId}`, {
        headers: { token: `Bearer ${token}` },
      });
      setCartItems((prevCartItems) =>
        prevCartItems.filter((id) => id !== productId)
      );
    } catch (error) {
      console.log("Failed to remove item from the cart.");
    }
  };
  const subtotal = productDetails.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div className="mx-auto pt-2 bg-gray-50 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="px-4 py-6 lg:px-44 sm:px-6">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        {/* Error handling */}
        <div className="flex flex-col justify-center mx-auto max-w-7xl px-4 bg-gray-50 lg:px-64 md:px-16 sm:px-6">
          {cartLoading && (
            <p className="text-lg text-center animate-pulse my-2 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
              Loading cart...
            </p>
          )}
          {cartError && (
            <p className="text-lg text-center my-2 text-red-600 sm:text-xl md:text-2xl lg:text-3xl">
              {cartError}
            </p>
          )}
          {productLoading && (
            <p className="text-lg text-center animate-pulse my-2 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
              Loading Cart items details...
            </p>
          )}
          {productError && (
            <p className="text-lg text-center my-2 text-red-600 sm:text-xl md:text-2xl lg:text-3xl">
              {productError}
            </p>
          )}
          {!cartLoading && !productLoading && productDetails.length === 0 && (
            <p className="text-lg text-center my-2 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
              Your cart is empty.
            </p>
          )}
        </div>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {productDetails.map((product) => (
              <li key={product._id} className="flex py-6">
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.img}
                      alt={product.titlet}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/products/${product._id}`}>
                          {product.title}
                        </Link>
                      </h3>
                      <p className="ml-4">$ {product.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                      >
                        Qty
                      </label>
                      <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => {
                          handleRemoveBtn(product._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 lg:px-64 md:px-16 sm:px-6">
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between py-1">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-semibold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="text-gray-600">Shipping</p>
            <p className="font-semibold">
              {cartItems.length === 0 ? "$ 0.00" : "$ 5.00"}
            </p>
          </div>
          <div className="flex justify-between py-1">
            <p className="text-gray-600">Tax</p>
            <p className="font-semibold">${(subtotal * 0.2).toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
            <p className="font-semibold">Order Total</p>
            <p className="font-semibold">
              {" "}
              $
              {(
                subtotal +
                (cartItems.length === 0 ? 0 : 5) +
                subtotal * 0.2
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <button className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Continue to Payment
        </button>
        <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            <button
              type="button"
              className="font-medium"
              // onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
