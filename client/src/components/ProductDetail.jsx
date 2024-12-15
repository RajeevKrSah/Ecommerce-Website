import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTljMmFjMmUwNmJmMzEwMDA4ZDk1ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczNDI0NzYzNywiZXhwIjoxNzM0MzM0MDM3fQ.3MdCmwb4LYhMFostVf-Y-c5au09kVLMHGUZIGFG2NDo"
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/find/${id}`
        );
        setProduct(response.data);
        setSelectedSize(response.data.size?.[0] || "");
        setSelectedColor(response.data.color?.[0] || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);



  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users", {
          headers: { token: `Bearer ${token}` },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleAddToCart = async () => {
    if (!userDetails || !product) {
      console.error("User or product details are missing.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/cart",
        {
          userId: userDetails[0]._id,
          products: [{ productId: product._id }],
        },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      console.log("Cart updated successfully:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
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
    <div className="flex flex-col lg:flex-row items-center bg-white lg:my-10 md:my-6 rounded-lg shadow-xl max-w-6xl mx-auto p-5 md:p-7 lg:p-12">
      {/* Product Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={product.img}
          alt={product.title}
          className="rounded-md w-full h-auto object-cover shadow-md"
        />
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-8">
        <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{product.desc}</p>
        <p className="text-2xl font-medium text-gray-800 mt-4">
          Price :
          <span className="text-2xl ml-4 font-bold text-gray-800">
            ${product.price}
          </span>
        </p>

        {/* Ratings */}
        <div className="flex items-center mt-4">
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
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-800">Color</h4>
          <div className="flex items-center mt-2 space-x-3">
            {product.color?.map((color) => (
              <div
                key={color}
                className={`w-7 h-7 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-blue-500"
                    : "border-gray-50"
                } cursor-pointer`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
              ></div>
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="mt-6">
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

        {/* Selected Size and Color */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Selected Size:</strong> {selectedSize || "None"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Selected Color:</strong> {selectedColor || "None"}
          </p>
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
