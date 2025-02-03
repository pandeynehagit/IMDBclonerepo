import { createContext, useState, useEffect } from "react";
import axios from "axios";
// Create the context
export const MoviesContext = createContext();

// Create a provider component
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [pageno, setPageno] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=9c0bdd8869a27c700cc44053be2b7718&page=${pageno}`
      )
      .then((response) => {
        setMovies(response.data.results);
       
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, [pageno]);
  

  const handlePageNext = () => {
    setPageno((prev) => (prev < 20 ? prev + 1 : 1));
  };

  const handlePagePrev = () => {
    setPageno((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <MoviesContext.Provider
      value={{ movies, setMovies, pageno, handlePageNext, handlePagePrev }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
