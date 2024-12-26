import React from "react";
import { Link } from "react-router-dom";
import { CalendarDaysIcon, EyeIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid grid-cols-1 gap-x-6 gap-y-5 py-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Newsletter
            </h2>
            <p className="mt-0.5 text-base text-gray-300">
            Stay updated with the latest offers and news from Luxora Shop.
            </p>
            <form className="mt-2 flex max-w-md gap-x-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </form>
          </div>
             {/* Offers and Deals Sections */}    
          <div className="lg:col-span-2 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-start">
            <div className="flex gap-5 items-center">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <div className="text-base font-semibold text-white">
                Weekly Offers
              </div>
            </div>
            <div className="mt-1 text-base text-gray-200">
              Enjoy up to 80% off on all products across Men's, Women's, and
              Kids' sections. Visit regularly to catch the latest deals!
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="flex gap-5 items-center">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <EyeIcon aria-hidden="true" className="size-6 text-white" />
              </div>
              <div className="text-base font-semibold text-white">
                Current Deals
              </div>
            </div>
            <div className="mt-1 text-base text-gray-200">
              Don't miss today's exclusive deals! In the Kid's section, enjoy
              Buy 1, Get 3 on selected items. Plus, in the Women's section, take
              advantage of Buy 1, Get 2 offers!
            </div>
          </div>
          </div>
        </div>
        {/* Footer Section */}
        <div className="border-t border-gray-500 pt-4 pb-3">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-gray-300">
              © 2024 Luxora Shop. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-gray-300 hover:text-white">
                About Us
              </Link>
              <Link to="" className="text-gray-300 hover:text-white">
                Contact Us
              </Link>
              <Link to="" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link
                to="https://github.com/RajeevKrSah"
                target="_blank"
                className="text-gray-300  hover:text-white"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
