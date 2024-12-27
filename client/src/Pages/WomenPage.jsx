import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WomenPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products?category=women")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="mx-auto bg-gray-50 max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <section className="relative">
          <img
            src="/src/assets/women_banner.png"
            alt="Women Fashion Banner"
            className="w-full h-[450px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-30 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              Explore Women’s Fashion
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Stylish and Elegant Collections
            </p>
            <button className="mt-6 px-6 py-2 bg-gold-500 hover:bg-gold-600 text-white text-lg font-medium rounded">
              Shop Now
            </button>
          </div>
        </section>

        {/* All Products */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default WomenPage;
