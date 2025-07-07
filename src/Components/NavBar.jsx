import React, { useState } from "react";
import {
  X,
  Film,
  Home,
  Clapperboard,
  Menu,
  Tv,
  List,
  Search,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full top-0 bg-gray-800 text-white flex justify-between items-center">
      {" "}
      {/* Added items-center */}
      <div className="flex items-center">
        <img className="w-9 h-9" src="/imges/logo.jpeg" alt="image" />
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {" "}
        {/* Desktop Navigation */}
        <Link to="/" className="flex items-center hover:text-gray-300">
          <Home className="h-5 w-5 mr-1" /> Home
        </Link>
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsMoviesOpen(true)}
          onMouseLeave={() => setIsMoviesOpen(false)}
        >
          <button className="flex items-center hover:text-gray-300">
            <Clapperboard className="h-5 w-5 mr-1" />
            <span>Movies</span>
          </button>
          <AnimatePresence>
            {isMoviesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-full left-0 mt-2 w-48 bg-gray-700 shadow-lg rounded-lg z-50" // top-full for dropdown position
              >
                <Link
                  to="/movies/popular"
                  className="block px-4 py-2 hover:bg-gray-600"
                  key="/movies/popular"
                >
                  Popular Movies
                </Link>
                <Link
                  to="/movies/upcoming"
                  className="block px-4 py-2 hover:bg-gray-600"
                  key="/movies/upcoming"
                >
                  Upcoming Movies
                </Link>
                <Link
                  to="/movies/trending"
                  className="block px-4 py-2 hover:bg-gray-600"
                  key="/movies/trending"
                >
                  Trending Movies
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link to="/shows" className="flex items-center hover:text-gray-300">
          <Tv className="h-5 w-5 mr-1" /> Shows
        </Link>
        <Link to="/watchlist" className="flex items-center hover:text-gray-300">
          <List className="h-5 w-5 mr-1" /> Watchlist
        </Link>
      </div>
      <div className="hidden md:flex items-center">
        <User />
      </div>
      {/* Mobile Menu Button */}
      <button className="md:hidden p-2" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-10 left-0 w-full bg-gray-800 opacity-80 z-50">
          {" "}
          {/* z-50 for overlay */}
          <div className="text-white  font-bold ">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-gray-300 text-white "
              key="/"
              onClick={toggleMobileMenu}
            >
              {" "}
              {/* Close menu on click */}
              <Home className="h-5 w-5 mr-2 inline-block " /> Home
            </Link>
            <div
              className="relative" // Keep relative for dropdown positioning
              onMouseEnter={() => setIsMoviesOpen(true)}
              onMouseLeave={() => setIsMoviesOpen(false)}
            >
              <button className="block px-4 py-2 hover:bg-gray-600 w-full text-left flex items-center">
                {" "}
                {/* Full width button */}
                <Clapperboard className="h-5 w-5 mr-2 inline-block" /> Movies
              </button>
              <AnimatePresence>
                {isMoviesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute top-full left-0 w-full bg-gray-700 shadow-lg rounded-lg z-50"
                  >
                    <Link
                      to="/movies/popular"
                      className="block px-4 py-2 hover:bg-gray-600"
                      key="/movies/popular"
                      onClick={toggleMobileMenu}
                    >
                      Popular Movies
                    </Link>
                    <Link
                      to="/movies/upcoming"
                      className="block px-4 py-2 hover:bg-gray-600"
                      key="/movies/upcoming"
                      onClick={toggleMobileMenu}
                    >
                      Upcoming Movies
                    </Link>
                    <Link
                      to="/movies/trending"
                      className="block px-4 py-2 hover:bg-gray-600"
                      key="/movies/trending"
                      onClick={toggleMobileMenu}
                    >
                      Trending Movies
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              to="/shows"
              className="block px-4 py-2 hover:bg-gray-600"
              key="/shows"
              onClick={toggleMobileMenu}
            >
              <Tv className="h-5 w-5 mr-2 inline-block" /> Shows
            </Link>
            <Link
              to="/watchlist"
              className="block px-4 py-2 hover:bg-gray-600"
              key="/watchlist"
              onClick={toggleMobileMenu}
            >
              <List className="h-5 w-5 mr-2 inline-block" /> Watchlist
            </Link>
            <div className="block px-4 py-2">
              <User className=" inline-block h-5 w-5 mr-2" />
              login
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
