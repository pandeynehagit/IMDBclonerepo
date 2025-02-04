import React from "react";
import RatingCircle from "../Utils/RatingCircle";
import { useNavigate } from "react-router-dom";
const MovieCard = ({
  movie,
  addtoWatchList,
  removefromWatchList,
  isaddedtoWatchList,
}) => {
  const navigate = useNavigate();

  const handleAddToWatchlist = (e) => {
    e.stopPropagation(); // Prevent modal from opening
    addtoWatchList(movie);
  };

  const handleRemoveFromWatchlist = (e) => {
    e.stopPropagation(); // Prevent modal from opening
    removefromWatchList(movie);
  };
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the movie detail page
  };

  return (
    <>
      <div
        className="relative h-[40vh] w-[200px] bg-cover bg-center flex rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
        }}
        onClick={handleCardClick}
      >
        {isaddedtoWatchList ? (
          <div
            className="absolute top-0 right-0 m-2 bg-gray-200 bg-opacity-40 cursor-pointer p-1 rounded"
            onClick={handleRemoveFromWatchlist}
          >
            ❌
          </div>
        ) : (
          <div
            className="absolute top-0 right-0 m-2 bg-gray-200 bg-opacity-40 cursor-pointer p-1 rounded"
            onClick={handleAddToWatchlist}
          >
            ❤️
          </div>
        )}

        <div className="absolute bottom-0 left-0 text-white w-full text-center text-2xl p-2 bg-gray-900 opacity-80">
          {movie.title}
        </div>
        <div className="absolute bottom-0 left-0">
          <RatingCircle rating={movie.vote_average} />
        </div>
      </div>
    </>
  );
};

export default MovieCard;
