// Navbar.tsx

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* Your logo image or text */}
            <span className="text-white text-lg font-semibold">
              SportsStore
            </span>
          </div>
          {/* Navigation links */}
          <div className="hidden sm:block sm:ml-6">
            <ul className="flex space-x-4">
              {/* Home Page NavLink */}
              <li>
                <NavLink
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </NavLink>
              </li>
              {/* Shop Page NavLink */}
              <li>
                <NavLink
                  to="/shop"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Shop
                </NavLink>
              </li>
              {/* Cart Page NavLink */}
              <li>
                <NavLink
                  to="/cart"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cart
                </NavLink>
              </li>
              {/* User Profile NavLink */}
              <li>
                <NavLink
                  to="/profile"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
