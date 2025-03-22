// import React, { useState, useEffect, useContext } from "react";

// import { WatchListContext } from "../Context/WatchListContext";
// const WatchList = () => {
//   const {
//     watchlist,
//     setWatchlist,
//     removefromWatchList,
//     searchQuery,
//     setSearchQuery,
//   } = useContext(WatchListContext);
//   const [currentGenre, setCurrentGenre] = useState("All");
//   const [genreList, setGenreList] = useState(["All"]);
//   const genreids = {
//     28: "Action",
//     12: "Adventure",
//     16: "Animation",
//     35: "Comedy",
//     80: "Crime",
//     99: "Documentary",
//     18: "Drama",
//     10751: "Family",
//     14: "Fantasy",
//     36: "History",
//     27: "Horror",
//     10402: "Music",
//     9648: "Mystery",
//     10749: "Romance",
//     878: "Sci-Fi",
//     10770: "TV",
//     53: "Thriller",
//     10752: "War",
//     37: "Western",
//   };

//   useEffect(() => {
//     const genres = watchlist.map((movie) => {
//       return genreids[movie.genre_ids[0]];
//     });
//     const uniqueGenres = new Set(genres);
//     setGenreList(["All", ...uniqueGenres]);
//   }, [watchlist]);

//   // const filteredWatchlist = watchlist.filter((movie) =>
//   //   movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   // );

//   // if (!watchlist || watchlist.length === 0) {
//   //   return <div>Add movies in watchlist</div>;
//   // }
//   const handleAscendingRatings = () => {
//     console.log(watchlist);
//     const sortedAscending = watchlist.sort((m1, m2) => {
//       return m1.vote_average - m2.vote_average;
//     });
//     console.log(sortedAscending);
//     setWatchlist([...sortedAscending]);
//   };

//   const handleDescendingRatings = () => {
//     console.log(watchlist);
//     const sortedDescending = watchlist.sort((m1, m2) => {
//       return m2.vote_average - m1.vote_average;
//     });
//     console.log(sortedDescending);
//     setWatchlist([...sortedDescending]);
//   };
//   return (
//     <>
//       {/* genre list on top */}
//       <div className="flex justify-center m-4">
//         {genreList.map((genre) => {
//           return (
//             <div
//               className={
//                 currentGenre === genre
//                   ? "mx-4 flex justify-center items-center bg-blue-400 h-[3rem] w-[9rem] text-white font-bold border rounded-xl hover:cursor-pointer hover:scale-110 duration-300 "
//                   : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4 hover:cursor-pointer hover:scale-110 duration-300"
//               }
//               onClick={(e) => setCurrentGenre(e.target.innerText)}
//             >
//               {genre}
//             </div>
//           );
//         })}
//       </div>
//       {/* search field */}
//       <div className="flex my-10 justify-center">
//         <input
//           placeholder="search movie"
//           className=" h-[3rem] w-[18rem] bg-gray-200 px-4 border border-gray-400"
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>
//       {/* watchList table */}
//       <div className="m-8">
//         <table className="w-full text-center ">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-4 font-medium text-gray-900">Name</th>
//               <th className="justify-evenly">
//                 <i
//                   onClick={handleAscendingRatings}
//                   className="fa-solid fa-arrow-up hover:cursor-pointer "
//                 ></i>{" "}
//                 Ratings{" "}
//                 <i
//                   onClick={handleDescendingRatings}
//                   className="fa-solid fa-arrow-down hover:cursor-pointer"
//                 ></i>
//               </th>
//               <th>Popularity</th>

//               <th>Genre</th>
//               <th>Delete Movies</th>
//             </tr>
//           </thead>
//           <tbody>
//             {watchlist
//               .filter((movie) => {
//                 if (currentGenre === "All") {
//                   return true;
//                 } else {
//                   return genreids[movie.genre_ids[0]] === currentGenre;
//                 }
//               })
//               .filter((movie) =>
//                 movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//               )
//               .map((movie) => (
//                 <tr key={movie.id}>
//                   <td className="flex items-center px-4 py-4">
//                     <img
//                       className="h-[150px] w-[150px] bg-cover bg-center flex rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
//                       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                       alt={movie.title}
//                     />
//                     <div className="item-center mx-2">{movie.title}</div>
//                   </td>
//                   <td>{movie.vote_average}</td>
//                   <td>{movie.popularity}</td>
//                   <td>{genreids[movie.genre_ids[0]]}</td>
//                   <td className="text-red-500">
//                     <button onClick={() => removefromWatchList(movie)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default WatchList;

import React, { useState, useEffect, useContext } from "react";
import { WatchListContext } from "../Context/WatchListContext";
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const WatchList = () => {
  const {
    watchlist,
    setWatchlist,
    removefromWatchList,
    searchQuery,
    setSearchQuery,
  } = useContext(WatchListContext);

  const [sortOrder, setSortOrder] = useState("");
  const [genres, setGenres] = useState({}); // Store genres as an object for quick lookup

  // Fetch genres dynamically from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${VITE_API_KEY}`
      );
      const data = await res.json();

      // Convert genre list to a key-value object for quick access
      const genreMap = {};
      data.genres.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });

      setGenres(genreMap);
    };
    fetchGenres();
  }, []);

  const handleSort = (order) => {
    const sortedList = [...watchlist].sort((m1, m2) =>
      order === "asc"
        ? m1.vote_average - m2.vote_average
        : m2.vote_average - m1.vote_average
    );
    setWatchlist(sortedList);
    setSortOrder(order);
  };

  return (
    <>
      {/* Filters Row */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-800 text-white gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search movie"
          className="p-2 bg-gray-700 rounded-md outline-none w-full md:w-1/4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Rating Dropdown */}
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="p-2 bg-gray-700 rounded-md w-full md:w-auto"
        >
          <option value="">Sort by Ratings</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Movies Table */}
      <div className="m-8 overflow-x-auto">
        <table className="w-full text-center border border-gray-700">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-2 py-2 md:px-6 md:py-4 text-left">Name</th>
              <th>Ratings</th>
              <th className="hidden md:table-cell">Popularity</th>
              <th className="hidden md:table-cell">Genre</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((movie) => (
                <tr key={movie.id} className="border-b border-gray-700">
                  <td className="flex flex-col md:flex-row items-center px-2 py-2 md:px-4 md:py-4 text-left">
                    <img
                      className="h-20 w-20 rounded-lg mr-0 md:mr-4"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    {movie.title}
                  </td>
                  <td>{movie.vote_average}</td>
                  <td className="hidden md:table-cell">{movie.popularity}</td>
                  <td className="hidden md:table-cell">
                    {movie.genre_ids
                      .map((id) => genres[id] || "Unknown") // Map genre IDs to names
                      .join(", ")}{" "}
                  </td>
                  <td>
                    <button
                      onClick={() => removefromWatchList(movie)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
