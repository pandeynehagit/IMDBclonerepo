import React, { useState, useEffect, useContext } from "react";
import { MoviesContext } from "../Context/MoviesContext";

const Banner = () => {
  const { movies } = useContext(MoviesContext);
  const [bannerImage, setBannerImage] = useState("");
  const [title, setTitle] = useState("PlaceHolder");
  useEffect(() => {
    if (movies.length > 0) {
      const idx = Math.floor(Math.random() * movies.length);
      const selectedMovie = movies[idx];

      // Ensure selectedMovie has necessary properties
      if (selectedMovie && selectedMovie.backdrop_path) {
        // setBannerImage(
        //   "https://image.tmdb.org/t/p/original/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg"
        // );
        setBannerImage(
          `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`
        );
        setTitle(selectedMovie.title);
      } else {
        setBannerImage("https://picsum.photos/seed/picsum/200/300");
        //     setTitle("Placeholder"); // Default title if not available
        //   }
        // } else {
        //   setBannerImage(""); // Reset banner image if movies or results are not available
        //   setTitle("Placeholder"); // Reset title if movies or results are not available
      }
    }
  }, [movies]);

  return (
    <div
      className="h-[20vh] md:h-[50vh] bg-top bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="text-white w-full text-center text-2xl">{title}</div>
    </div>
  );
};

export default Banner;
