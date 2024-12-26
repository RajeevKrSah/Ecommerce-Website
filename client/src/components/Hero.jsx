import React, { useState, useEffect } from "react";
import axios from "axios";

const Hero = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products?category=women")
      .then((res) => {
        setProducts(res.data.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(products);
  return (
    <div className="mx-auto bg-gray-50 max-w-7xl px-2 sm:px-6 lg:px-8">
      {/* Banner Section */}
      <section className="relative">
        <img
          src="/src/assets/winter_banner.jpg"
          alt="Winter Collection Banner"
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-30 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Winter Collection</h1>
          <p className="mt-4 text-2xl md:text-3xl ">Up to 50% Off</p>
          <button className="mt-6 px-6 py-2 bg-gold-500 hover:bg-gold-600 text-white text-lg font-medium rounded">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Men */}
          <div className="relative group">
            <img
              src="/src/assets/mens_collection.jpg"
              alt="Men Category"
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-4 py-2 bg-white text-black font-medium rounded">
                Shop Men
              </button>
            </div>
          </div>
          {/* Women */}
          <div className="relative group">
            <img
              src="/src/assets/women_collections.jpg"
              alt="Women Category"
              className="w-full h-72 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-4 py-2 bg-white text-black font-medium rounded">
                Shop Women
              </button>
            </div>
          </div>
          {/* Kids */}
          <div className="relative group">
            <img
              src="/src/assets/kids_collection.jpg"
              alt="Kids Category"
              className="aspect-auto w-full h-72 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-4 py-2 bg-white text-black font-medium rounded">
                Shop Kids
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Trending Products */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Trending Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
          {products.length > 0 &&
            products.map((item) => (
              <div
                key={item._id}
                className="border p-3 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="aspect-square w-full rounded-lg object-cover md:h-70 lg:h-75"
                />
                <div className="flex justify-between items-center mt-2 gap-2">
                  <h3 className="text-base font-semibold truncate">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">${item.price}</p>
                </div>
                <button className="mt-2 w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded">
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
