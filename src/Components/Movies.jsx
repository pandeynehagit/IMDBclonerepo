import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { MoviesContext } from "../Context/MoviesContext";
import { WatchListContext } from "../Context/WatchListContext";

const Movies = () => {
  const { movies, handlePageNext, handlePagePrev, pageno } =
    useContext(MoviesContext);
  const { addtoWatchList, removefromWatchList, isaddedtoWatchList } =
    useContext(WatchListContext);

  return (
    <div>
      <div className="text-3xl font-bold, m-5 text-center">
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
      <Pagination
        pageno={pageno}
        handlePageNext={handlePageNext}
        handlePagePrev={handlePagePrev}
      />
    </div>
  );
};

export default Movies;
