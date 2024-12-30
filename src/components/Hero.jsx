import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-16 left-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="text-center max-w-5xl py-16">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-800 mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-600">
            Explore Smarter
          </span>
          <br />
          with <span className="text-red-500">Travel Insights</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-light text-gray-600 mb-8">
          Your AI-powered travel companion for seamless trip planning. Get
          tailored recommendations, real-time updates, and explore destinations
          like never before.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center gap-4 mb-12">
          <button className="px-8 py-4 bg-gradient-to-r from-red-400 to-pink-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform">
            Start Your Journey
          </button>
          <button className="px-8 py-4 bg-white text-red-500 border border-red-300 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform">
            Watch Demo
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative mt-8">
          <img
            src="/hero.avif"
            alt="Travel Planner Illustration"
            className="w-full max-w-lg mx-auto drop-shadow-xl rounded-lg"
          />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-300 to-red-300 h-2 w-32 rounded-full"></div>
        </div>

        {/* Decorative Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-gray-700">
          <div className="feature-item p-6 bg-pink-100 rounded-lg shadow-sm">
            <h3 className="text-3xl font-semibold text-pink-500">50k+</h3>
            <p className="text-sm">Happy Travelers</p>
          </div>
          <div className="feature-item p-6 bg-red-100 rounded-lg shadow-sm">
            <h3 className="text-3xl font-semibold text-red-500">100+</h3>
            <p className="text-sm">Destinations</p>
          </div>
          <div className="feature-item p-6 bg-purple-100 rounded-lg shadow-sm">
            <h3 className="text-3xl font-semibold text-purple-500">24/7</h3>
            <p className="text-sm">AI Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
