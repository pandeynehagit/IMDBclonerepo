import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieContext from "../Context/MovieContext";

const Banner = () => {
  const { movies, setCategory } = useContext(MovieContext);
  const [index, setIndex] = useState(0);
  const latestMovies = movies.slice(0, 8);

  useEffect(() => {
    setCategory("trending/movie/");

    if (latestMovies.length > 0) {
      setIndex(0); // Reset index when movies update
    }
  }, [movies, latestMovies.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % latestMovies.length);
  };
  const previousSlide = () => {
    setIndex((prev) => (prev - 1 + latestMovies.length) % latestMovies.length);
  };
  const goToSlide = (i) => {
    setIndex(i);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, previousSlide, latestMovies.length]);
  //error handling
  if (latestMovies.length === 0) {
    return (
      <div className="w-full h-[30vh] md:h-[50vh] bg-gray-200 flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="relative bg-gray-800 w-full h-[30vh] md:h-[50vh] overflow-hidden">
      {/*Banner*/}
      <AnimatePresence>
        {latestMovies.length > 0 && (
          <motion.div
            key={latestMovies[index].id}
            className="absolute w-full h-full bg-cover bg-center border-4 border-white shadow-lg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${latestMovies[index].backdrop_path})`,
              backgroundPosition: "center top",
            }}
            initial={{ x: 30, opacity: 0, duration: 2.0 }} // Start with zoom and opacity 0
            animate={{ x: 0, opacity: 1 }} // Zoom out and fully visible
            exit={{ x: -30, opacity: 0 }} // Zoom back and fade out when leaving
            transition={{
              duration: 3.0,
              ease: "easeInOut",
            }}
          >
            {/* Movie Title */}
            <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-3 rounded-lg text-lg font-bold">
              {latestMovies[index].title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {latestMovies.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full ${
              i === index ? "bg-white scale-125" : "bg-gray-400"
            } transition-all`}
            onClick={() => goToSlide(i)}
          ></button>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={previousSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full"
      >
        <i className="fa fa-arrow-left"></i>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full"
      >
        <i className="fa fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default Banner;
