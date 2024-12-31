import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import useAuthToken from "../hooks/useAuthToken";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();
  const { userId, token } = useAuthToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/find/${id}`);
        const data = response.data;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const renderRatingStars = (rating) => {
    return (
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, idx) => (
          <span key={idx}>
            {idx < rating ? (
              <>&#9733;</>
            ) : (
              <span className="text-gray-300">&#9733;</span>
            )}
          </span>
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color to add product to cart");
      return;
    }
    const products = {
      productId: product._id,
      title: product.title,
      productImg: product.img,
      color: selectedColor,
      size: selectedSize,
      price: product.price,
      quantity: 1,
    };
    dispatch(addToCart({ userId, products, token }));

    alert("Product added to cart successfully!");
  };
  return (
    <>
      <Navbar />
      <main className="mx-auto bg-gray-50 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 bg-white rounded-lg shadow-lg">
          {/* Product Image Section */}
          <div className="sm:max-w-[475px] sm:max-h-[475px] md:mx-auto">
            <img
              src={product.img}
              alt={product.title || "Product image"}
              className="h-full w-full object-cover object-center rounded-lg"
              loading="lazy"
            />
          </div>

          {/* Product Details Section */}
          <div className="space-y-2 px-2 md:space-y-4 md:px-4  lg:space-y-4 lg:my-3 ">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600">{product.desc}</p>
            <p className="text-xl font-semibold text-gray-800">
              Price: ${product.price}
            </p>

            <div className="flex items-center space-x-2">
              {renderRatingStars(5)}
              <span className="text-sm text-gray-500">(117 reviews)</span>
            </div>

            {/* Color Options */}
            <div>
              <h4 className="text-lg font-medium text-gray-800">Color</h4>
              <div className="flex space-x-3 mt-2">
                {product.color?.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 transition ${
                      selectedColor === color
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    aria-selected={selectedColor === color}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div>
              <h4 className="text-lg font-medium text-gray-800">Size</h4>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                      product.size?.includes(size)
                        ? selectedSize === size
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "bg-gray-100 text-gray-800 hover:bg-indigo-50"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!product.size?.includes(size)}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
