import React, { useState } from "react";
import RatingCircle from "../Utils/RatingCircle";
import { useNavigate } from "react-router-dom";
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
    <div className="w-[200px]  bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 duration-300 hover:cursor-pointer">
      {/* Movie Image */}
      <div
        className="relative w-full h-[300px]  bg-cover bg-center "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
        }}
        onClick={handleCardClick}
      >
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
        <div>
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

export default MovieCard;
("use client");
("use client");

// import { useState } from "react";
// import RatingCircle from "../Utils/RatingCircle";
// import { useNavigate } from "react-router-dom";
// import { FaEllipsisV, FaStar, FaBookmark } from "react-icons/fa";
// import { format } from "date-fns";

// const MovieCard = ({
//   movie,
//   addtoWatchList,
//   removefromWatchList,
//   isaddedtoWatchList,
// }) => {
//   const navigate = useNavigate();

//   const [showOptions, setShowOptions] = useState(false);
//   const [rating, setRating] = useState(0);
//   const formattedDate = format(new Date(movie.release_date), "MMM dd, yyyy");

//   const handleAddToWatchlist = (e) => {
//     e.stopPropagation();
//     addtoWatchList(movie);
//   };

//   const handleRemoveFromWatchlist = (e) => {
//     e.stopPropagation();
//     removefromWatchList(movie);
//   };

//   const handleCardClick = () => {
//     navigate(`/movie/${movie.id}`);
//   };

//   const handleMenu = (e) => {
//     e.stopPropagation();
//     setShowOptions(!showOptions);
//   };

//   const handleStarClick = (e, star) => {
//     e.stopPropagation();
//     setRating((prevRating) => (prevRating === star ? 0 : star));
//   };

//   return (
//     <div className="w-full sm:w-[180px] md:w-[200px] lg:w-[220px] bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 duration-300 hover:cursor-pointer">
//       {/* Movie Image */}
//       <div
//         className="relative w-full aspect-[2/3] bg-cover bg-center"
//         style={{
//           backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
//         }}
//         onClick={handleCardClick}
//       >
//         {/* Options button */}
//         <div
//           className="absolute top-2 right-2 p-2 bg-gray-800 bg-opacity-60 rounded-full cursor-pointer"
//           onClick={handleMenu}
//         >
//           <FaEllipsisV className="text-white text-sm md:text-base" />
//         </div>
//         {showOptions && (
//           <div className="absolute top-10 right-2 bg-white rounded-lg shadow-md w-36 sm:w-40 z-50">
//             <ul className="py-2 text-xs sm:text-sm">
//               <li
//                 className="flex items-center px-4 py-2 cursor-pointer"
//                 onClick={(e) => {
//                   if (isaddedtoWatchList) {
//                     handleRemoveFromWatchlist(e);
//                   } else {
//                     handleAddToWatchlist(e);
//                   }
//                   setShowOptions(false);
//                 }}
//               >
//                 WatchList
//                 <FaBookmark
//                   className={`ml-auto text-xl ${
//                     isaddedtoWatchList ? "text-yellow-400" : "text-gray-400"
//                   }`}
//                 />
//               </li>
//               <li className="px-4 py-2 cursor-pointer">
//                 <div className="flex items-center">
//                   Your Rating:
//                   <div className="flex ml-auto">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <FaStar
//                         key={star}
//                         className={`cursor-pointer ${
//                           star <= rating ? "text-yellow-500" : "text-gray-400"
//                         }`}
//                         onClick={(e) => handleStarClick(e, star)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         )}
//         {/* Rating Circle */}
//         <div className="absolute bottom-2 left-2">
//           <RatingCircle rating={movie.vote_average} />
//         </div>
//       </div>

//       {/* Movie Info (Release Date and Title) */}
//       <div className="p-3 sm:p-4">
//         {/* Movie Title */}
//         <div className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 mt-1 sm:mt-2 line-clamp-2">
//           {movie.title}
//         </div>
//         {/* Release Date */}
//         <div className="text-xs sm:text-sm text-gray-500 mt-1">
//           <p>{formattedDate}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;
