import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/find/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading product details...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg max-w-5xl mx-auto p-6">
      <div className="w-full md:w-1/2">
        <img
          src={product.img}
          alt={product.title}
          className="rounded-md w-full h-auto object-cover"
        />
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-1/2 mt-3 md:mt-0 md:pl-8">
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
        <h3 className="text-base font-medium mt-2 text-gray-600">{product.desc}</h3>
        <p className="text-lg text-gray-600 mt-2">Price of the product <span className="text-xl font-bold text-gray-800">${product.price}</span></p>

        {/* Ratings */}
        <div className="flex items-center mt-4">
          <div className="flex text-yellow-500">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span className="text-gray-300">&#9733;</span>
          </div>
          <span className="ml-2 text-sm text-gray-500">117 reviews</span>
        </div>

                {/* Color Options */}
                <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-800">Color</h4>
          <div className="flex items-center mt-2 space-x-3">
            {product.color?.map((color, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full border ${
                  color === "white"
                    ? "bg-white"
                    : `bg-${color}-500`
                }`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-800">Size</h4>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {product.size?.map((size) => (
              <button
                key={size}
                className={`p-2 border rounded-md text-sm ${
                  size === "S"
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-600"
                }`}
                disabled={size === "XXXL"}
              >
                {size}
              </button>
            ))}
          </div>
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline mt-2 inline-block"
          >
            Size guide
          </a>
        </div>

        {/* Add to Bag Button */}
        <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
          Add to bag
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
