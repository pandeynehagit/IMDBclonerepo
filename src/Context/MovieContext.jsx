import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  hideLoading,
  showLoading,
} from "../Components/LoaderSlice/loadingSlice";

const MovieContext = createContext();

const API_KEY = import.meta.env.VITE_API_KEY;

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("trending/movie/day");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      // Don't fetch if the category isn't set yet
      if (!category) return;

      try {
        dispatch(showLoading()); // Correct: Call the action creator
        console.log("ATTEMPTING TO FETCH WITH CATEGORY:", `'${category}'`);
        const response = await axios.get(
          `https://api.themoviedb.org/3/${category}?api_key=${API_KEY}&page=${page}`
        );
        console.log("the response is ", response);

        setMovies((prevMovies) =>
          page === 1
            ? response.data.results
            : [...prevMovies, ...response.data.results]
        );
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(hideLoading()); // Correct: Call the action creator
      }
    };

    fetchMovies();
  }, [category, page, dispatch]); // Added dispatch to dependency array

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <MovieContext.Provider
      value={{ movies, page, setPage, category, setCategory, loadMore }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
