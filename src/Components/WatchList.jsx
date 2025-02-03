import React, { useState, useEffect, useContext } from "react";

import { WatchListContext } from "../Context/WatchListContext";
const WatchList = () => {
  const {
    watchlist,
    setWatchlist,
    removefromWatchList,
    searchQuery,
    setSearchQuery,
  } = useContext(WatchListContext);
  const [currentGenre, setCurrentGenre] = useState("All");
  const [genreList, setGenreList] = useState(["All"]);
  const genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    console.log("Current watchlist:", watchlist);
  }, [watchlist]);

  useEffect(() => {
    const genres = watchlist.map((movie) => {
      return genreids[movie.genre_ids[0]];
    });
    const uniqueGenres = new Set(genres);
    setGenreList(["All", ...uniqueGenres]);
  }, [watchlist]);

  // const filteredWatchlist = watchlist.filter((movie) =>
  //   movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // if (!watchlist || watchlist.length === 0) {
  //   return <div>Add movies in watchlist</div>;
  // }
  const handleAscendingRatings = () => {
    console.log(watchlist);
    const sortedAscending = watchlist.sort((m1, m2) => {
      return m1.vote_average - m2.vote_average;
    });
    console.log(sortedAscending);
    setWatchlist([...sortedAscending]);
  };

  const handleDescendingRatings = () => {
    console.log(watchlist);
    const sortedDescending = watchlist.sort((m1, m2) => {
      return m2.vote_average - m1.vote_average;
    });
    console.log(sortedDescending);
    setWatchlist([...sortedDescending]);
  };
  return (
    <>
      {/* genre list on top */}
      <div className="flex justify-center m-4">
        {genreList.map((genre) => {
          return (
            <div
              className={
                currentGenre === genre
                  ? "mx-4 flex justify-center items-center bg-blue-400 h-[3rem] w-[9rem] text-white font-bold border rounded-xl hover:cursor-pointer hover:scale-110 duration-300 "
                  : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4 hover:cursor-pointer hover:scale-110 duration-300"
              }
              onClick={(e) => setCurrentGenre(e.target.innerText)}
            >
              {genre}
            </div>
          );
        })}
      </div>
      {/* search field */}
      <div className="flex my-10 justify-center">
        <input
          placeholder="search movie"
          className=" h-[3rem] w-[18rem] bg-gray-200 px-4 border border-gray-400"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* watchList table */}
      <div className="m-8">
        <table className="w-full text-center ">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="justify-evenly">
                <i
                  onClick={handleAscendingRatings}
                  className="fa-solid fa-arrow-up hover:cursor-pointer "
                ></i>{" "}
                Ratings{" "}
                <i
                  onClick={handleDescendingRatings}
                  className="fa-solid fa-arrow-down hover:cursor-pointer"
                ></i>
              </th>
              <th>Popularity</th>

              <th>Genre</th>
              <th>Delete Movies</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movie) => {
                if (currentGenre === "All") {
                  return true;
                } else {
                  return genreids[movie.genre_ids[0]] === currentGenre;
                }
              })
              .filter((movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((movie) => (
                <tr key={movie.id}>
                  <td className="flex items-center px-4 py-4">
                    <img
                      className="h-[150px] w-[150px] bg-cover bg-center flex rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="item-center mx-2">{movie.title}</div>
                  </td>
                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>
                  <td>{genreids[movie.genre_ids[0]]}</td>
                  <td className="text-red-500">
                    <button onClick={() => removefromWatchList(movie)}>
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
