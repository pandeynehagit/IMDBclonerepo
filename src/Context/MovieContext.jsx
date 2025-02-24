// import { createContext, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { showLoading, hideLoading } from "../Components/LoaderSlice/LoaderSlice";

// export const MoviesContext = createContext();
// const API_KEY = import.meta.env.VITE_API_KEY;

// export const MoviesProvider = ({ children, endpoint }) => {
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!endpoint) return; // Don't fetch if endpoint is not provided

//     const fetchMovies = async () => {
//       try {
//         dispatch(showLoading());

//         const response = await axios.get(
//           `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&page=${page}`
//         );

//         setMovies(response.data.results);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       } finally {
//         dispatch(hideLoading());
//       }
//     };

//     fetchMovies();
//   }, [endpoint, page, dispatch]); // Re-fetch when `endpoint` or `page` changes

//   const loadMore = () => setPage((prev) => prev + 1);

//   return (
//     <MoviesContext.Provider value={{ movies, loadMore }}>
//       {children}
//     </MoviesContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();

const API_KEY = import.meta.env.VITE_API_KEY;
import { useDispatch } from "react-redux";
import {
  hideLoading,
  showLoading,
} from "../Components/LoaderSlice/loadingSlice";

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("trending/movie/day");

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(showLoading);
        const response = await axios.get(
          `https://api.themoviedb.org/3/${category}?api_key=${API_KEY}&page=${page}`
        );

        setMovies((prevMovies) =>
          page === 1
            ? response.data.results
            : [...prevMovies, ...response.data.results]
        );
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(hideLoading);
      }
    };

    fetchMovies();
  }, [category, page]);

  // Fetch movies when page or category changes

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    setMovies([]); //Reset movies when category changes
    setPage(1); // Reset to first page when category changes
  }, [category]);
  return (
    <MovieContext.Provider value={{ movies, setPage, setCategory, loadMore }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
