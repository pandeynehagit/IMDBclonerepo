import { createContext, useState, useEffect } from "react";
import axios from "axios";
// Create the context
export const MoviesContext = createContext();
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

// Create a provider component
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${VITE_API_KEY}&page=${pageno}`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, [pageno]);
  const fetchMovieDetails = (movieId) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${VITE_API_KEY}&append_to_response=credits,videos`
      )
      .then((response) => {
        setMovieDetails(response.data); // Set detailed movie info
      })
      .catch((error) => {
        console.log("Error fetching movie details", error);
      });
  };
  const handlePageNext = () => {
    setPageno((prev) => (prev < 20 ? prev + 1 : 1));
  };

  const handlePagePrev = () => {
    setPageno((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        movieDetails,
        fetchMovieDetails,
        setMovies,
        pageno,
        handlePageNext,
        handlePagePrev,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
