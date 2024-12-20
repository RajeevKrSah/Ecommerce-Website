import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import Products from "./Products";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const brandOption = [
  { value: "Zara", label: "Zara", checked: false },
  { value: "Biba", label: "Biba", checked: false },
  { value: "Levis", label: "Levis", checked: true },
  { value: "H&M", label: "H & M", checked: false },
  { value: "Adidas", label: "Adidas", checked: false },
  { value: "Calvin Klein", label: "Calvin Klein", checked: false },
  { value: "Bewakoof", label: "Bewakoof", checked: false },
];

const categoryFilters = [
  { value: "men", label: "Men", checked: false },
  { value: "women", label: "Women", checked: false },
  { value: "kids", label: "Kids", checked: true },
];

const sizeFilters = [
  { value: "S", label: "S", checked: false },
  { value: "M", label: "M", checked: false },
  { value: "L", label: "L", checked: false },
  { value: "XL", label: "XL", checked: true },
  { value: "XXL", label: "XXL", checked: false },
];

const filters = [
  { id: "category", name: "Categories", options: categoryFilters },
  { id: "brand", name: "Brands", options: brandOption },
  { id: "size", name: "Size", options: sizeFilters },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FilterSection = ({ section, selectedFilters, handleFilterClick }) => (
  <Disclosure as="div" className="border-b border-gray-200 py-6">
    <h3 className="-my-3 flow-root">
      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900">{section.name}</span>
        <span className="ml-6 flex items-center">
          <PlusIcon
            aria-hidden="true"
            className="size-5 group-data-[open]:hidden"
          />
          <MinusIcon
            aria-hidden="true"
            className="size-5 group-[&:not([data-open])]:hidden"
          />
        </span>
      </DisclosureButton>
    </h3>
    <DisclosurePanel className="pt-6">
      <div className="space-y-4">
        {section.options.map((option, optionIdx) => (
          <div key={option.value} className="flex gap-3">
            <div className="flex h-5 shrink-0 items-center">
              <div className="group grid size-4 grid-cols-1">
                <input
                  id={`filter-${section.id}-${optionIdx}`}
                  name={`${section.id}[]`}
                  type="checkbox"
                  checked={selectedFilters[section.id]?.includes(option.value)}
                  onChange={() => handleFilterClick(section.id, option.value)}
                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:checked]:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor={`filter-${section.id}-${optionIdx}`}
              className="text-sm text-gray-600"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </DisclosurePanel>
  </Disclosure>
);

const ProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    brand: [],
    size: [],
  });


  const handleFilterClick = (sectionId, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[sectionId];
      const isSelected = currentValues.includes(value);
      return {
        ...prev,
        [sectionId]: isSelected
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const [selectedSort, setSelectedSort] = useState(
    sortOptions.find((option) => option.current).name
  );

  const handleSortOptionClick = (option) => {
    setSelectedSort(option.name);
    sortOptions.forEach((opt) => (opt.current = opt.name === option.name));
    console.log(`Sorting by: ${option.name}`);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-min transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-6">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 px-6 border-t border-gray-200">
                {filters.map((section) => (
                  <FilterSection
                    key={section.id}
                    section={section}
                    selectedFilters={selectedFilters}
                    handleFilterClick={handleFilterClick}
                  />
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
            <h1 className="font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    {selectedSort}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => handleSortOptionClick(option)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block w-full px-4 py-2 text-left text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-5">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <FilterSection
                    key={section.id}
                    section={section}
                    selectedFilters={selectedFilters}
                    handleFilterClick={handleFilterClick}
                  />
                ))}
              </form>

              <div className="lg:col-span-3">
                <Products filters={selectedFilters} sort={selectedSort} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
