import React, { useContext } from "react";
import MovieCard from "./MovieCard";
//import Pagination from "./Pagination";
import { MoviesContext } from "../Context/MoviesContext";
import { WatchListContext } from "../Context/WatchListContext";
import LoadingSpinner from "../Utils/LoadingSpinner";

const Movies = () => {
  const {
    movies,
    loadingSpinner,
    //handlePageNext,
    //handlePagePrev,
    // pageno,
    // totalPages,
    //pageRange,
    //updatePageRange,
    loadMore,
    load,
  } = useContext(MoviesContext);
  const { addtoWatchList, removefromWatchList, isaddedtoWatchList } =
    useContext(WatchListContext);

  return (
    <div className="relative">
      {loadingSpinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}

      <div className="text-3xl font-bold m-5 text-center">
        <h1 className="p-4">Trending Movies</h1>
      </div>
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
      {/* <Pagination
        pageno={pageno}
        handlePageNext={handlePageNext}
        handlePagePrev={handlePagePrev}
        totalPages={totalPages}
        pageRange={pageRange}
        updatePageRange={updatePageRange}
      /> */}
      <div className="flex justify-center mt-4">
        <button
          onClick={loadMore}
          disabled={load}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {load ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};
export default Movies;
