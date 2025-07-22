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
              <th className="px-4 py-2 md:px-6 md:py-4 text-left">Name</th>
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
