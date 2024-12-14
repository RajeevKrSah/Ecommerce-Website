import React from "react";
import {Link} from "react-router-dom"
const ProductCard = ({ item }) => {
  return (

      <div key={item._id} className="px-4 group relativ shadow-xl rounded-md cursor-pointer">
      <Link to={`/products/${item._id}`}>
        <img
          alt={item.desc}
          src={item.img}
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover md:h-70 lg:h-75 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-1 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
        <div className="flex justify-between items-center my-1">
          <div className="flex">
            <p className="text-base text-gray-600 mr-1">Price :</p>
            <p className="text-base font-bold text-gray-800">${item.price}</p>
          </div>
          <p className="text-sm text-gray-500">
            Brand: <span className="font-medium text-gray-800">{item.brand}</span>
          </p>
        </div>
      </div>
      </div>
  );
};

export default ProductCard;
