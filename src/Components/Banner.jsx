// import React, { useState, useEffect, useContext } from "react";
// import { MoviesContext } from "../Context/MoviesContext";

// const Banner = () => {
//   const { movies } = useContext(MoviesContext);
//   const [bannerImage, setBannerImage] = useState("");
//   const [title, setTitle] = useState("PlaceHolder");
//   useEffect(() => {
//     if (movies.length > 0) {
//       const idx = Math.floor(Math.random() * movies.length);
//       const selectedMovie = movies[idx];

//       // Ensure selectedMovie has necessary properties
//       if (selectedMovie && selectedMovie.backdrop_path) {
//         // setBannerImage(
//         //   "https://image.tmdb.org/t/p/original/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg"
//         // );
//         setBannerImage(
//           `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`
//         );
//         setTitle(selectedMovie.title);
//       } else {
//         setBannerImage("https://picsum.photos/seed/picsum/200/300");
//         //     setTitle("Placeholder"); // Default title if not available
//         //   }
//         // } else {
//         //   setBannerImage(""); // Reset banner image if movies or results are not available
//         //   setTitle("Placeholder"); // Reset title if movies or results are not available
//       }
//     }
//   }, [movies]);

//   return (
//     <div
//       className="h-[20vh] md:h-[50vh] bg-top bg-cover bg-center flex items-end"
//       style={{
//         backgroundImage: `url(${bannerImage})`,
//       }}
//     >
//       <div className="text-white w-full text-center text-2xl">{title}</div>
//     </div>
//   );
// };

// export default Banner;
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoviesContext } from "../Context/MoviesContext"; // Adjust the path as needed

const Banner = () => {
  const { movies } = useContext(MoviesContext);
  const [index, setIndex] = useState(0);
  const latestMovies = movies.slice(0, 8);

  useEffect(() => {
    if (latestMovies.length > 0) {
      setIndex(0); // Reset index when movies update
    }
  }, [movies, latestMovies.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % latestMovies.length);
  };

  const goToSlide = (i) => {
    setIndex(i);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [latestMovies.length]);
  if (latestMovies.length === 0) {
    return (
      <div className="w-full h-[30vh] md:h-[50vh] bg-gray-200 flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="relative w-full h-[30vh] md:h-[50vh] overflow-hidden">
      {/* Background Banner (Previous Image Stays) */}
      {latestMovies.length > 0 && (
        <div
          className="absolute w-full h-full bg-cover bg-center border-4 border-white shadow-lg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              latestMovies[
                (index - 1 + latestMovies.length) % latestMovies.length
              ].backdrop_path
            })`,
          }}
        ></div>
      )}

      {/* Foreground Banner (Slides Over the Previous One) */}
      <AnimatePresence mode="wait">
        {latestMovies.length > 0 && (
          <motion.div
            key={latestMovies[index].id}
            className="absolute w-full h-full bg-cover bg-center border-4 border-white shadow-lg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${latestMovies[index].backdrop_path})`,
            }}
            initial={{ x: "100%" }} // Start from the right
            animate={{ x: 0 }} // Slide in fully
            exit={{ x: 0 }} // Keep in place (so previous stays behind)
            transition={{ duration: 2.0, ease: "easeInOut" }}
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
    </div>
  );
};

export default Banner;
