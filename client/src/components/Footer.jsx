import React from "react";
import { CalendarDaysIcon, EyeIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
const Footer = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-5 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Newsletter
            </h2>
            <p className="mt-3 text-lg text-gray-300">
              Get timely updates from your favorite Products.
            </p>
            <div className="mt-5 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
              Weekly Offers
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
              Enjoy up to 80% off on all products across Men's, Women's, and Kids' sections. Visit regularly to catch the latest deals!
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <EyeIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
              Current Deals
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
              Don't miss today's exclusive deals! In the Kids' section, enjoy Buy 1, Get 3 on selected items. Plus, in the Women's section, take advantage of Buy 1, Get 2 offers!
              </dd>
            </div>
          </dl>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none ">
          <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center text-gray-400">
            <p className=" flex-1 order-2 md:order-1 mt-3">
              {" "}
              © Rajeev Kumar, 2024.{" "}
            </p>
            <div className="flex-1 order-1 md:order-2">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
