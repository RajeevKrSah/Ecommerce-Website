import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const APIUrl = import.meta.env.VITE_API_URL;
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import useAuthToken from "../hooks/useAuthToken";

const Navbar = () => {
  const navigate = useNavigate()
  const navigation = [
    { name: "Home", to: "/", },
    { name: "About", to: "/about", },
    { name: "Login", to: "/login", },
  ];

// Sign Out handler
  const handleSignOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }
  const {token, userId} = useAuthToken();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    let intervalId;
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${APIUrl}/api/cart/find/${userId}`, {
          headers: { token: `Bearer ${token}` }, 
        });
        const cartProducts = response.data;
        setCartItemCount(cartProducts.length); 
      } catch (error) {
        console.error("Failed to load cart items:", error.message);
      }
    };

    if (userId && token) {
      fetchCartItems();
      intervalId = setInterval(fetchCartItems, 5000);
    }

    return () => {
      clearInterval(intervalId); 
    };
  }, [userId, token]); 

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex sm:flex-1 sm:ml-0 ml-12 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex shrink-0  items-center tracking-wide text-white text-2xl font-bold">
              Luxora
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white rounded-md "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to="/cart"
              className="relative rounded-full bg-gray-800 p-1 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <ShoppingBagIcon aria-hidden="true" className="size-6" />
              <span className="absolute -top-2 -right-1 inline-flex items-center justify-center rounded-full bg-gray-500 px-1.5 py-0.5 text-xs font-medium text-white">
                {cartItemCount}
              </span>
            </Link>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-7">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <div className="text-gray-200 text-xl px-1">
                  <i className="fa-solid fa-user"></i>
                  </div>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Order
                  </a>
                </MenuItem>
                <MenuItem>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-2 ">
          {navigation.map((item) => (
            <Link to={item.to} key={item.name}>
            <DisclosureButton
              className="block px-3 py-1.5 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white rounded-md "
            >
              {item.name}
            </DisclosureButton>
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
