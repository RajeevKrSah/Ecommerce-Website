import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/find/${id}`);
        const data = response.data;
        setProduct(data);
        setSelectedSize(data.size?.[0] || "");
        setSelectedColor(data.color?.[0] || "");
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

  return (
    <>
      <Navbar />
      <main className="mx-auto bg-gray-50 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-5 bg-white">
          {/* Product Image Section */}
          <div className="max-w-md mx-auto">
            <img
              src={product.img}
              alt={product.title || "Product image"}
              className="h-full w-full object-cover object-center rounded-md"
            />
          </div>

          {/* Product Details Section */}
          <div className="max-w-lg mx-auto p-3 space-y-1 md:space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-lg text-gray-600">{product.desc}</p>
            <p className="text-2xl font-semibold text-gray-800">
              Price: <span className="text-slate-900">${product.price}</span>
            </p>

            {/* Ratings */}
            <div className="flex items-center">
              {renderRatingStars(5)}
              <span className="ml-2 text-sm text-gray-500">(117 reviews)</span>
            </div>

            {/* Color Options */}
            <div>
              <h4 className="text-lg font-medium text-gray-800">Color</h4>
              <div className="flex items-center mt-2 space-x-3">
                {product.color?.map((color) => (
                  <div
                    key={color}
                    className={`w-7 h-7 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-blue-500"
                        : "border-gray-300"
                    } cursor-pointer`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
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
                    className={`p-2 border rounded-md text-sm font-medium transition ${
                      product.size?.includes(size)
                        ? selectedSize === size
                          ? "border-indigo-500 text-indigo-500"
                          : "border-gray-300 text-gray-800 hover:bg-gray-50"
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
              className="w-full py-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition"
              disabled={!selectedSize || !selectedColor}
              type="button"
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
