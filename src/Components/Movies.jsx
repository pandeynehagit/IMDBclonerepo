import React, { useContext, useEffect } from "react";
import MovieCard from "./MovieCard";
//import Pagination from "./Pagination";
import MovieContext from "../Context/MovieContext";
import { WatchListContext } from "../Context/WatchListContext";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "./LoaderSlice/loadingSlice";
const Movies = () => {
  const { movies, setPage, setCategory, loadMore } = useContext(MovieContext);
  const { addtoWatchList, removefromWatchList, isaddedtoWatchList } =
    useContext(WatchListContext);
  const isloading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(showLoading()); // Start loadin
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCategory("trending/movie/week"); // This triggers fetching inside context
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        dispatch(hideLoading()); // Stop loading after fetching
      }
    };
    fetchMovies();
  }, [dispatch]);

  return (
    <div className="relative bg-gray-800">
      <div className="text-3xl font-bold m-5 text-center">
        <h1 className="p-4">Trending Movies</h1>
      </div>
      {isloading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-evenly flex-wrap gap-4">
          {movies &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addtoWatchList={addtoWatchList}
                removefromWatchList={removefromWatchList}
                isaddedtoWatchList={isaddedtoWatchList(movie)}
              />
            ))}
        </div>
      )}

      <div className="flex justify-center pt-6 pb-6">
        <button
          onClick={loadMore}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Load More
        </button>
      </div>
    </div>
  );
};
export default Movies;
