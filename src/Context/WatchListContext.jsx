import { createContext, useState, useEffect } from "react";

// Create the context
export const WatchListContext = createContext();

// Create a provider component
export const WatchListProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    console.log("Watchlist updated:", watchlist);
  }, [watchlist]);

  const addtoWatchList = (movie) => {
    let newWatchList = [...watchlist, movie];
    setWatchlist(newWatchList);
    localStorage.setItem("movies", JSON.stringify(newWatchList));
    console.log(watchlist);
  };
  useEffect(() => {
    let moviesfromLocal = localStorage.getItem("movies");
    if (!moviesfromLocal) {
      return;
    }
    setWatchlist(JSON.parse(moviesfromLocal));
  }, []);

  const removefromWatchList = (movie) => {
    let newWatchList = watchlist.filter((item) => item.id !== movie.id);
    setWatchlist(newWatchList);
    console.log(watchlist);
  };

  const isaddedtoWatchList = (movie) => {
    return watchlist.some((item) => item.id === movie.id);
  };

  return (
    <WatchListContext.Provider
      value={{
        watchlist,
        setWatchlist,
        addtoWatchList,
        removefromWatchList,
        isaddedtoWatchList,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
