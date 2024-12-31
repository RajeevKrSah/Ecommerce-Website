import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "./cartSlice";
import useAuthToken from "../../hooks/useAuthToken";

const Cart = () => {
  const dispatch = useDispatch();
  const { userId, token } = useAuthToken();

  useEffect(() => {
    dispatch(fetchCart({ userId, token }));
  }, [dispatch, userId, token]);

  const { cartItems, loading } = useSelector((state) => state.cart);

  const handleRemoveBtn = async (_id) => {
    dispatch(removeFromCart({ userId, _id, token }));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [cartItems]);
  const shippingCost = cartItems.length === 0 ? 0 : 5;
  const tax = useMemo(() => subtotal * 0.2, [subtotal]);
  const orderTotal = useMemo(
    () => subtotal + shippingCost + tax,
    [subtotal, shippingCost, tax]
  );
  if (loading) {
    return (
      <div className="flex flex-col justify-center mx-auto mt-10 mb-10 max-w-7xl px-4 bg-gray-50 lg:px-64 md:px-16 sm:px-6">
        <p className="text-lg text-center my-2 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
          Loading cart items...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto pt-2 bg-gray-50 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="px-4 py-6 lg:px-44 sm:px-6">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center mx-auto max-w-7xl px-4 bg-gray-50 lg:px-64 md:px-16 sm:px-6">
            <p className="text-lg text-center my-2 text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
              Your cart is empty.
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="h-24 w-24 md:h-32 md:w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Link to={`/products/${item.productId}`}>
                    <img
                      src={item.productImg}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/products/${item.productId}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">
                      {item.color}, {item.size}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="inline text-sm font-medium leading-6 text-gray-900">
                      Qty: {item.quantity}
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => {
                          handleRemoveBtn(item._id);
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
            <p className="font-semibold">${shippingCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="text-gray-600">Tax</p>
            <p className="font-semibold">${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
            <p className="font-semibold">Order Total</p>
            <p className="font-semibold"> ${orderTotal.toFixed(2)}</p>
          </div>
        </div>
        <button className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Continue to Payment
        </button>
        <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            <button type="button" className="font-medium">
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
