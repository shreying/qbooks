import React, { useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];
  const [MobileNav, setMobileNav] = useState("hidden");

  // Toggle function for mobile menu
  const toggleMobileNav = () => {
    setMobileNav((prev) => (prev === "hidden" ? "block" : "hidden"));
  };

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src="./logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold">Quasar Books</h1>
        </Link>
        <div className="nav-links-qbooks hidden md:flex items-center gap-4">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="hover:text-blue-700 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileNav}
          className="md:hidden text-white text-2xl hover:text-zinc-400"
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile navigation menu */}
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-700 transition-all duration-300"
            key={i}
            onClick={toggleMobileNav} // Close menu on link click
          >
            {item.title}
          </Link>
        ))}
        <Link
          to="/login"
          className="px-8 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
          onClick={toggleMobileNav}
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="px-8 py-2 mb-8 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          onClick={toggleMobileNav}
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Navbar;
