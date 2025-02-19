import React, { useContext, useEffect } from "react";
import MovieContext from "../Context/MovieContext";

const PopularMovies = () => {
  const { movies, setPage, setCategory, loadMore } = useContext(MovieContext);

  useEffect(() => {
    setCategory("movie/popular"); // Tell Context to fetch Popular Movies
  }, []);

  return (
    <div className="bg-gray-800 text-center p-4">
      <h4 className="text-2xl font-bold text-gray-400 mb-4">Popular Movies</h4>

      <div className="flex flex-wrap justify-center gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-[250px]"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4 text-center bg-gray-500">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-800">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={loadMore}>Load More</button>
      </div>
    </div>
  );
};

export default PopularMovies;
