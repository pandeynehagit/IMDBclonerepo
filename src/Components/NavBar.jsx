// import React from "react";
// import { Link } from "react-router-dom";
// import { Film, Home, Clapperboard, Tv, List, Search, User } from 'lucide-react';

// function NavBar() {
//   return (
//     <nav className="flex text-2xl text-blue-500 font-bold bg-gray-700 space-x-4 pl-3 py-4">

//       <Link to="/">Home</Link>

//       <Link to="/watchlist">WatchList</Link>
//     </nav>
//   );
// }

// export default NavBar;
import React, { useState } from "react";
import { Film, Home, Clapperboard, Tv, List, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="mx-2 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <Film className="h-6 w-6" />

          <Link
            to="/"
            className="flex items-center space-x-1 hover:text-gray-300"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>

          {/* Movies Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsMoviesOpen(true)}
            onMouseLeave={() => setIsMoviesOpen(false)} // Small delay before closing
          >
            <button className="flex items-center space-x-1 hover:text-gray-300">
              <Clapperboard className="h-5 w-5" />
              <span>Movies</span>
            </button>

            {/* Animated Dropdown Menu */}
            <AnimatePresence>
              {isMoviesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-0 mt-2 w-48 bg-gray-700 shadow-lg rounded-lg z-50"
                  onMouseEnter={() => setIsMoviesOpen(true)} // Keep open when hovering
                  onMouseLeave={() => setIsMoviesOpen(false)} // Close when mouse leaves
                >
                  <Link
                    to="/movies/popular"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Popular Movies
                  </Link>
                  <Link
                    to="/movies/upcoming"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Upcoming Movies
                  </Link>
                  <Link
                    to="/movies/trending"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Trending Movies
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/shows"
            className="flex items-center space-x-1 hover:text-gray-300"
          >
            <Tv className="h-5 w-5" />
            <span>Shows</span>
          </Link>

          <Link
            to="/watchlist"
            className="flex items-center space-x-1 hover:text-gray-300"
          >
            <List className="h-5 w-5" />
            <span>Watchlist</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-300">
            <Search className="h-5 w-5" />
          </button>
          <button className="hover:text-gray-300">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
