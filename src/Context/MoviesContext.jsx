import { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  showLoading,
  hideLoading,
} from "../Components/LoaderSlice/LoaderSlice";

// Create the context
export const MoviesContext = createContext();
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [pageno, setPageno] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [pageRange, setPageRange] = useState([1, 10]);
  const [load, setLoad] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(showLoading());
        setLoadingSpinner(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${VITE_API_KEY}&page=${pageno}`
        );

        setMovies((prev) => [...prev, ...response.data.results]);
        // setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(hideLoading());
        setTimeout(() => setLoadingSpinner(false), 500); // Delay to make spinner visible for a moment
      }
    };

    fetchMovies();
  }, [pageno, dispatch]);

  const fetchMovieDetails = (movieId) => {
    dispatch(showLoading());
    setLoadingSpinner(true);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${VITE_API_KEY}&append_to_response=credits,videos`
      )
      .then((response) => {
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.log("Error fetching movie details", error);
      })
      .finally(() => {
        dispatch(hideLoading());
        setTimeout(() => setLoadingSpinner(false), 500);
      });
  };

  // const handlePageNext = () => {
  //   if (pageno < totalPages) {
  //     setPageno((prev) => prev + 1);
  //   }
  // };

  // const handlePagePrev = () => {
  //   if (pageno > 1) {
  //     setPageno((prev) => prev - 1);
  //   }
  // };
  // const updatePageRange = (newRange) => {
  //   setPageRange(newRange);
  // };
  const loadMore = () => setPageno((prev) => prev + 1);
  return (
    <MoviesContext.Provider
      value={{
        loadingSpinner,
        movies,
        movieDetails,
        fetchMovieDetails,
        //pageno,
        //handlePageNext,
        //handlePagePrev,
        //totalPages,
        //pageRange,
        //updatePageRange,
        loadMore,
        load,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
