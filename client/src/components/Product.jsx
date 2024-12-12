import React from "react";
import { Link } from "react-router-dom";
import products from '../assets/Product.js'

const Product = ({ filters, sort }) => {
  console.log("Product Prop", filters, sort);
  console.log(filters.category[0]);

  return (
    <div className="bg-white">
      <Link to={`/products/${filters.category[0]}`}>
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <img
                  alt={product.desc}
                  src={product.img}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{product.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {product.cat}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
