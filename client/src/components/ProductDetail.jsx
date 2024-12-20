import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";
const APIUrl = import.meta.env.VITE_API_URL;

const ProductDetail = () => {
  const { token, userId } = useAuthToken();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${APIUrl}/api/products/find/${id}`);
        setProduct(response.data);
        setSelectedSize(response.data.size?.[0] || "");
        setSelectedColor(response.data.color?.[0] || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      // Fetching the current cart data
      const cartResponse = await axios.get(
        `${APIUrl}/api/cart/find/${userId}`,
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      const cartItems = cartResponse.data;
      let isProductInCart = false;

      // Checking if the product exists in the cart
      cartItems.forEach((cartItem) => {
        cartItem.products.forEach((item) => {
          if (
            item.productId === product._id ||
            item.size === product.selectedSize ||
            item.color === product.selectedColor
          ) {
            isProductInCart = true;
            return;
          }
        });
      });

      if (isProductInCart) {
        // Notifing user
        console.log("Product is already in the cart.");
        return;
      }
      const response = await axios.post(
        `${APIUrl}/api/cart`,
        {
          userId: userId,
          products: [
            {
              productId: product._id,
              size: selectedSize,
              color: selectedColor,
            },
          ],
        },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      console.log("response", response.data);

      console.log("Cart updated successfully:");
    } catch (error) {
      console.error("Error product adding to cart:", error);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-700">
          Loading product details...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center bg-white lg:mb-10 md:mb-6 rounded-lg shadow-xl max-w-6xl mx-auto p-5 md:p-7 lg:p-12">
      {/* Product Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={product.img}
          alt={product.title}
          className="w-full lg:w-[500px] lg:h-[500px] md:w-[500px] object-cover object-center shadow-xl rounded-md"
        />
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-8">
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-base text-gray-600 mt-2">{product.desc}</p>
        <p className="md:text-xl text-lg font-medium text-gray-800 mt-2">
          Price :
          <span className="md:text-xl text-lg ml-2 font-bold text-gray-800">
            ${product.price}
          </span>
        </p>

        {/* Ratings */}
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, idx) => (
              <span key={idx}>
                {idx < 4 ? (
                  <>&#9733;</>
                ) : (
                  <span className="text-gray-300">&#9733;</span>
                )}
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">(117 reviews)</span>
        </div>

        {/* Color Options */}
        <div className="mt-3">
          <h4 className="text-base font-medium text-gray-800">Color</h4>
          <div className="flex items-center mt-2 space-x-3">
            {product.color?.map((color) => (
              <div
                key={color}
                className={`w-7 h-7 rounded-full border-2 ${
                  selectedColor === color ? "border-blue-500" : "border-gray-50"
                } cursor-pointer`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
              ></div>
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-800">Size</h4>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
              <button
                key={size}
                className={`p-2 border rounded-md text-sm font-medium transition ${
                  product.size?.includes(size)
                    ? selectedSize === size
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300 text-gray-800 hover:bg-gray-100"
                    : "border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                }`}
                disabled={!product.size?.includes(size)}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Bag Button */}
        <button
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
          disabled={!selectedSize || !selectedColor}
          onClick={handleAddToCart}
          type="button"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
