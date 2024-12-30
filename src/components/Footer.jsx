import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-pink-50 to-red-50 py-8 px-6 text-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo and Tagline */}
        <div className="mb-6">
          <img
            src="/icon.svg"
            alt="Travel Insights Logo"
            className="w-12 h-12 mx-auto mb-3"
          />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500">
            Travel Insights
          </h2>
          <p className="text-gray-600 mt-2">
            Explore smarter with AI-powered travel solutions.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a
            href="/features"
            className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Features
          </a>
          <a
            href="/pricing"
            className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Pricing
          </a>
          <a
            href="/about"
            className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://facebook.com"
            className="text-pink-500 hover:text-purple-500 transition-transform transform hover:scale-110"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a
            href="https://twitter.com"
            className="text-pink-500 hover:text-purple-500 transition-transform transform hover:scale-110"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-pink-500 hover:text-purple-500 transition-transform transform hover:scale-110"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a
            href="https://linkedin.com"
            className="text-pink-500 hover:text-purple-500 transition-transform transform hover:scale-110"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Travel Insights. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
