import React, { useState } from "react";
import RatingCircle from "../Utils/RatingCircle";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { FaEllipsisV, FaStar, FaBookmark } from "react-icons/fa";
import { format } from "date-fns";

const MovieCard = ({
  movie,
  addtoWatchList,
  removefromWatchList,
  isaddedtoWatchList,
}) => {
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const formattedDate = format(new Date(movie.release_date), "MMM dd, yyyy");
  const handleAddToWatchlist = useCallback(
    (e) => {
      e.stopPropagation(); // Prevent modal from opening
      addtoWatchList(movie);
    },
    [addtoWatchList, movie]
  );

  const handleRemoveFromWatchlist = useCallback(
    (e) => {
      e.stopPropagation(); // Prevent modal from opening
      removefromWatchList(movie);
    },
    [removefromWatchList, movie]
  );

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the movie detail page
  };
  const handleMenu = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };
  const handleStarClick = (e, star) => {
    e.stopPropagation(); // Prevent navigation to the movie detail page
    setRating((prevRating) => (prevRating === star ? 0 : star));
  };

  return (
    <div className="w-[200px]  bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 duration-300 hover:cursor-pointer">
      {/* Movie Image */}
      <div
        className="relative w-full h-[300px]  bg-cover bg-center "
        onClick={handleCardClick}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          loading="lazy" // load lazy
          className="w-full h-full object-cover"
          alt={movie.title}
        />
        {/* Options button */}
        <div
          className="absolute top-2 right-2 p-2 bg-gray-800 bg-opacity-60 rounded-full cursor-pointer"
          onClick={handleMenu}
        >
          <FaEllipsisV className="text-white" />
        </div>
        {showOptions && (
          <div className="absolute top-10 right-2 bg-white rounded-lg shadow-md w-40 z-50">
            <ul className="py-2">
              <li
                className="flex  px-4 py-2 cursor-pointer "
                onClick={(e) => {
                  if (isaddedtoWatchList) {
                    handleRemoveFromWatchlist(e);
                  } else {
                    handleAddToWatchlist(e);
                  }
                  setShowOptions(false);
                }}
              >
                WatchList
                <FaBookmark
                  className={` ml-8 text-2xl ${
                    isaddedtoWatchList ? "text-yellow-400" : "text-gray-400"
                  }`}
                />
              </li>
              <li className="px-4 py-2 cursor-pointer ">
                <div className="flex items-center">
                  Your Rating:
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`ml-2 cursor-pointer ${
                        star <= rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                      onClick={(e) => handleStarClick(e, star)}
                    />
                  ))}
                </div>
              </li>
            </ul>
          </div>
        )}
        {/* Rating Circle */}
        <div className="absolute top-2 left-2 z-10">
          <RatingCircle rating={movie.vote_average} />
        </div>
      </div>

      {/* Movie Info (Release Date and Title) */}
      <div className="p-4">
        {/* Movie Title */}
        <div className="font-semibold text-xl text-gray-800 mt-2">
          {movie.title}
        </div>
        {/* Release Date */}
        <div className="text-sm text-gray-500">
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieCard);
