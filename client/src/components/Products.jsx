import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
const APIUrl = import.meta.env.VITE_API_URL;
const Products = ({ filters = {}, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${APIUrl}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //filter products based on selected filters
  const filterProducts = (products) => {
    return products.filter((product) => {
      const { category = [], size = [], brand = [] } = filters;

      // Filter by category
      if (category.length > 0 && !category.some(c => product.categories.includes(c))) {
        return false;
      }

      // Filter by size
      if (size.length > 0 && !size.some(s => product.size.includes(s))) {
        return false;
      }

      // Filter by color
      if (brand.length > 0 && !brand.some(c => product.brand.includes(c))) {
        return false;
      }

      return true;
    });
  };

  //sort products based on selected sort option
  const sortProducts = (products) => {
    switch (sort) {
      case "Most Popular":
        return products; 
      case "Best Rating":
        return products.sort((a, b) => b.rating - a.rating); 
      case "Price: Low to High":
        return products.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  useEffect(() => {
    const filtered = filterProducts(products);
    const sorted = sortProducts(filtered);
    setFilteredProducts(sorted);
  }, [filters, sort, products]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((item) => (
            <ProductCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
