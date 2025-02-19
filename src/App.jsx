import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import WatchList from "./Components/WatchList";
import NavBar from "./Components/NavBar";
import { MovieProvider } from "./Context/MovieContext";
import { WatchListProvider } from "./Context/WatchListContext";
import MovieDetailPage from "./Components/MovieDetailPage";
import UpcomingMovies from "./Components/UpcomingMovie";
import Movies from "./Components/Movies";
import PopularMovies from "./Components/PopularMovies";
function App() {
  return (
    <MovieProvider>
      <WatchListProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            <Route path="movies/upcoming" element={<UpcomingMovies />} />
            <Route path="movies/trending" element={<Movies />} />
            <Route path="movies/popular" element={<PopularMovies />} />
          </Routes>
        </BrowserRouter>
      </WatchListProvider>
    </MovieProvider>
  );
}

export default App;
