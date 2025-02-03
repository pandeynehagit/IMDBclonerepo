import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex text-2xl text-blue-500 font-bold space-x-4 pl-3 py-4">
      <img
        className="h-[5vh] w-[5vh]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1CXIz2ed1k87MrC_0BlWlwg9DiouBuXbKsQ&s"
        alt=""
      />
      <Link to="/">Home</Link>

      <Link to="/watchlist">WatchList</Link>
    </nav>
  );
}

export default NavBar;
