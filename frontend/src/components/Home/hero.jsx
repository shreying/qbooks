import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] relative flex flex-col items-center justify-center text-center lg:text-left">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./hero22.gif"
          alt="hero background"
          className="object-cover w-full h-full opacity-30"  // Reduced opacity for more transparency
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full lg:w-3/6 px-8 lg:px-16 flex flex-col items-center lg:items-start">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100">
          Welcome to Quasar Books
        </h1>
        <p className="mt-4 text-xl text-zinc-300 max-w-lg">
          Embark on a journey through stories that captivate, knowledge that
          enlightens, and ideas that inspire. Discover a world of books curated just for you.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full"
          >
            Explore Our Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
