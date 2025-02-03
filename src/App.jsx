import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import WatchList from "./Components/WatchList";
import NavBar from "./Components/NavBar";
import { MoviesProvider } from "./Context/MoviesContext";
import { WatchListProvider } from "./Context/WatchListContext";
function App() {
  return (
    <MoviesProvider>
      <WatchListProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Routes>
        </BrowserRouter>
      </WatchListProvider>
    </MoviesProvider>
  );
}

export default App;
