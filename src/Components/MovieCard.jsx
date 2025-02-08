import React, { useState } from "react";
import RatingCircle from "../Utils/RatingCircle";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaStar, FaBookmark } from "react-icons/fa";
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
  const handleMenu = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };
  const handleStarClick = (e, star) => {
    e.stopPropagation(); // Prevent navigation to the movie detail page
    setRating((prevRating) => (prevRating === star ? 0 : star));
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
                  //setShowOptions(false);
                }}
              >
                WatchList
                <FaBookmark
                  className={` ml-8 text-2xl ${
                    isaddedtoWatchList ? "text-yellow-400" : "text-gray-400"
                  }`}
                />
              </li>
              <li>
                <li className="px-4 py-2 cursor-pointer ">
                  <div className="flex items-center">
                    Your Rating:
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`ml-2 cursor-pointer ${
                          star <= rating ? "text-yellow-500" : "text-gray-400"
                        }`}
                        //onMouseEnter={() => setHoverRating(star)}
                        //onMouseLeave={() => setHoverRating(0)}
                        onClick={(e) => handleStarClick(e, star)}
                      />
                    ))}
                  </div>
                </li>
              </li>
            </ul>
          </div>
        )}

        {rating > 0 && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
            ⭐ {rating}/5
          </div>
        )}
        <div className="absolute bottom-0 left-0 text-white w-full text-center text-2xl p-2 bg-gray-900 opacity-80">
          {movie.title}
        </div>
        <div className="absolute top-0 left-0">
          <RatingCircle rating={movie.vote_average} />
        </div>
      </div>
    </>
  );
};

export default MovieCard;
