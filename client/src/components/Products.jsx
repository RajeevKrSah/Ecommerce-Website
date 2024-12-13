import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
const Products = ({ filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProduct,setFilteredProduct] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))}
          </div>
        </div>

    </div>
  );
};

export default Products;
