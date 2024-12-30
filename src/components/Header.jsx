import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-pink-50 to-red-50 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img src="/icon.svg" alt="Travel Insights Logo" className="w-10 h-10" />
        <a
          href="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
        >
          Travel Insights
        </a>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6">
        <a
          href="/features"
          className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
        >
          Features
        </a>
        <a
          href="/pricing"
          className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
        >
          Pricing
        </a>
        <a
          href="/about"
          className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
        >
          About Us
        </a>
        <a
          href="/contact"
          className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
        >
          Contact
        </a>
      </nav>

      {/* Sign-In Button */}
      <div>
        <Button className="px-6 py-2 rounded-lg shadow-lg text-white bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 hover:bg-gradient-to-l hover:from-purple-400 hover:via-pink-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105">
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
