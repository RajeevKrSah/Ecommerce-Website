import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <div
      key={item._id}
      className="border p-3 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
    >
      <Link to={`/products/${item._id}`}>
        <img
          src={item.img}
          alt={item.title}
          className="aspect-square w-full rounded-lg object-cover md:h-70 lg:h-75"
        />
      </Link>
      <div className="p-1 bg-white">
        <h3 className="text-base font-semibold text-gray-600 truncate">
          {item.title}
        </h3>
        <div className="flex justify-between items-center my-1">
          <div className="flex">
            <p className="text-base text-gray-600 mr-1">Price :</p>
            <p className="text-base font-bold text-gray-800">${item.price}</p>
          </div>
          <p className="text-sm text-gray-500">
            Brand:{" "}
            <span className="font-medium text-gray-800">{item.brand}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
