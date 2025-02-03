import React from "react";

const MovieCard = ({
  movie,
  addtoWatchList,
  removefromWatchList,
  isaddedtoWatchList,
}) => {
  return (
    <div
      className="relative h-[40vh] w-[200px] bg-cover bg-center flex rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
    >
      {isaddedtoWatchList ? (
        <div
          className="absolute top-0 right-0 m-2 bg-gray-200 bg-opacity-40 cursor-pointer"
          onClick={() => {
            removefromWatchList(movie);
          }}
        >
          ❌
        </div>
      ) : (
        <div
          className="absolute top-0 right-0 m-2 bg-gray-200 bg-opacity-40 cursor-pointer"
          onClick={() => {
            addtoWatchList(movie);
          }}
        >
          ❤️
        </div>
      )}

      <div className="absolute bottom-0 left-0 text-white w-full text-center text-2xl p-2 bg-gray-900 opacity-80">
        {movie.title}
      </div>
    </div>
  );
};

export default MovieCard;
