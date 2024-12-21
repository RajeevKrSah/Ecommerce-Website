import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // List of images for the dynamic section
  const images = [
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734215572/KidsImg_emtfew.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734211554/KidsPic24_rhikqz.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734200087/1a_xvaazy.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734166560/9_gk3tzv.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734125256/a1_sn9sog.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734166557/a4_lqcrzi.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734211555/KidsPic25_uwydcl.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734211558/KidsPic3_rzm9ql.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734166560/9_gk3tzv.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734185217/59_fphsv2.webp",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734208717/KidsPic1_nchbkq.avif",
    "https://res.cloudinary.com/dav9tzdha/image/upload/v1734211558/KidsPic5_ni8a08.avif",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Transition every 8 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-8 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent text-5xl font-bold tracking-tight sm:text-6xl">
              About Luxora
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Discover the essence of luxury, elegance, and sophistication in
              every detail.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-gray-800">
                Who We Are
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Luxora is more than a brand; it's a statement of timeless
                elegance and impeccable design. We believe luxury is about the
                stories, craftsmanship, and emotions behind every product.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With a mission to redefine premium shopping, we curate exclusive
                collections crafted by the finest artisans, combining
                sustainable practices with unparalleled quality.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At Luxora, every purchase is more than a product—it's an
                experience that reflects innovation, sustainability, and the
                pursuit of perfection.
              </p>
            </div>

            <div className="relative flex justify-center items-center">
              <img
                src={images[currentImageIndex]}
                alt="Luxora Premium Products"
                className="rounded-lg object-cover h-[450px] w-[450px] shadow-lg border border-gray-200 transition-transform duration-700 ease-in-out transform hover:scale-105"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-[#FFD700] text-4xl mb-2">
                <i className="fas fa-gem"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                Exquisite Craftsmanship
              </h4>
              <p className="mt-2 text-gray-600">
                Our products are crafted with meticulous attention to detail,
                ensuring the finest quality and elegance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-green-600 text-4xl mb-2">
                <i className="fas fa-leaf"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                Sustainable Luxury
              </h4>
              <p className="mt-2 text-gray-600">
                Luxora is committed to sustainability, offering eco-friendly
                products without compromising on luxury.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-pink-500 text-4xl mb-2">
                <i className="fas fa-handshake"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                Exceptional Support
              </h4>
              <p className="mt-2 text-gray-600">
                Our team is dedicated to providing world-class support to make
                your Luxora experience unforgettable.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-[#EFBF04] text-4xl mb-2">
                <i className="fas fa-hourglass"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                Timeless Elegance
              </h4>
              <p className="mt-2 text-gray-600">
                Our collections embody a fusion of timeless elegance and modern
                style, making Luxora the ultimate choice for premium products.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
