import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [cartError, setCartError] = useState(null);
  const [productError, setProductError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTljMmFjMmUwNmJmMzEwMDA4ZDk1ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczNDMzODM4NiwiZXhwIjoxNzM0NDI0Nzg2fQ.V8CaG7P6fFD6pzVIqa3EbA9JX6442I5NaFoieEed75M";
  const userId = "6759c2ac2e06bf310008d95e";

  const headers = useCallback({ token: `Bearer ${token}` }, [token]);

  // Helper function to fetch data
  const fetchData = async (url, options = {}) => {
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  };

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      setCartLoading(true);
      setCartError(null);
      try {
        const cartData = await fetchData(
          `http://localhost:4000/api/cart/find/${userId}`,
          { headers }
        );
        // Extract product IDs from cart items
        const productIds = cartData.flatMap((item) =>
          item.products.map((product) => product.productId)
        );
        console.log(cartData)
        setCartItems(productIds);
      } catch (error) {
        setCartError("Failed to load cart items.");
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, headers]);

  // Fetch product details for cart items
  useEffect(() => {
    if (cartItems.length === 0) return;

    const fetchProductDetails = async () => {
      setProductLoading(true);
      setProductError(null);
      try {
        const productDetailPromises = cartItems.map((id) =>
          fetchData(`http://localhost:4000/api/products/find/${id}`)
        );

        const products = await Promise.all(productDetailPromises);
        setProductDetails(products);
      } catch (error) {
        setProductError("Failed to load product details.");
      } finally {
        setProductLoading(false);
      }
    };

    fetchProductDetails();
  }, [cartItems]);

  const handleRemoveBtn = async (productId) => {

  };
  return (
    <>
      <div className="flex justify-center mx-auto max-w-7xl px-4 bg-gray-50 lg:px-64 md:px-16 sm:px-6">
      {cartLoading && (
        <p className="text-lg text-center animate-pulse my-5 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
          Loading cart...
        </p>
      )}
      {cartError && (
        <p className="text-lg text-center my-5 text-red-600 sm:text-xl md:text-2xl lg:text-3xl">
          {cartError}
        </p>
      )}
      {productLoading && (
        <p className="text-lg text-center animate-pulse my-5 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
          Loading Cart items details...
        </p>
      )}
      {productError && (
        <p className="text-lg text-center my-5 text-red-600 sm:text-xl md:text-2xl lg:text-3xl">
          {productError}
        </p>
      )}
      {!cartLoading && !productLoading && productDetails.length === 0 && (
        <p className="text-lg text-center my-5 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
          Your cart is empty.
        </p>
      )}
      </div>
      <div className="mx-auto pt-2 bg-gray-50 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-6 lg:px-44 sm:px-6">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
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
                          <Link to={`/products/${product._id}`}>{product.title}</Link>
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
                          onClick={()=>{
                            handleRemoveBtn(product._id)
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
              <p className="font-semibold">$262.00</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="text-gray-600">Shipping</p>
              <p className="font-semibold">$5.00</p>
            </div>
            <div className="flex justify-between py-1">
              <p className="text-gray-600">Tax</p>
              <p className="font-semibold">$53.40</p>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
              <p className="font-semibold">Order Total</p>
              <p className="font-semibold">$320.40</p>
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
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
