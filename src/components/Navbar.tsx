import { useState } from "react";
import { Link } from "react-router-dom";
import { FcCurrencyExchange } from "react-icons/fc";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Convert", href: "/" },
    { name: "Latest Rates", href: "/latest" },
    { name: "Currency Chart", href: "/chart" },
    { name: "About", href: "/about" },
  ];
  return (
    <nav className="z-50 bg-gray-100 dark:bg-slate-900 lg:w-full lg:fixed">
      <div
        className="container flex flex-wrap justify-between items-center p-6 mx-auto border-b-2 lg:px-8 dark:border-slate-600"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="-m-1.5 p-1.5 text-lg font-black text-gray-700 dark:text-gray-200 inline-flex items-center"
          >
            <FcCurrencyExchange className="mr-2 text-4xl" />
            React Exchange
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Flowbite>
            <DarkThemeToggle className="hover:!bg-transparent !mr-2 !ring-0 text-gray-700 dark:text-gray-50" />
          </Flowbite>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-gray-700 dark:text-gray-200 rounded-full"
          >
            {!isOpen ? (
              <FaBars className="text-2xl" />
            ) : (
              <FaTimes className="text-2xl" />
            )}
          </button>
        </div>
        <div
          className={
            isOpen
              ? "grid gap-y-12 content-center my-8 w-full"
              : "hidden lg:flex lg:gap-x-12"
          }
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-xl font-semibold leading-6 text-gray-900 lg:text-sm lg:py-0 dark:text-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Flowbite>
          <DarkThemeToggle className="!rounded-full !hidden lg:!flex !ml-12 !ring-0 text-gray-800 dark:text-gray-50" />
        </Flowbite>
      </div>
    </nav>
  );
};
