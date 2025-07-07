import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import MovieContext from "../Context/MovieContext";
import { WatchListContext } from "../Context/WatchListContext";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { useSelector } from "react-redux";

const Movies = () => {
  const { movies, loadMore } = useContext(MovieContext);
  const { addtoWatchList, removefromWatchList, isaddedtoWatchList } =
    useContext(WatchListContext);
  const isloading = useSelector((state) => state.loading.isLoading);

  return (
    <div className="relative bg-gray-800">
      <div className="text-3xl font-bold m-5 text-center">
        <h1 className="p-4">Trending Movies</h1>
      </div>
      {isloading && movies.length === 0 ? ( // Show spinner only on initial load
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

      {/* Conditionally render the button if not loading more */}
      <div className="flex justify-center pt-6 pb-6">
        {isloading ? (
          <LoadingSpinner />
        ) : (
          <button
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Movies;
