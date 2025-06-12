

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
