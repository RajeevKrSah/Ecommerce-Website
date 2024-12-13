import React from "react";

const ProductCard = ({ item }) => {
  return (
    <>
      <div key={item._id} className="group relativ">
        <img
          alt={item.desc}
          src={item.img}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{item.title}</h3>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">$ {item.price}</p>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
