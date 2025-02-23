import React, { useEffect, useState } from "react";
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${VITE_API_KEY}&language=en-US&page=1`;
 import { useContext } from "react";

const UpcomingMovies = () => {
  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        setMovies(data.results);
        if (data.results.length > 0) {
          setSelectedMovie(data.results[0]); // Default to first movie
          fetchTrailer(data.results[0].id);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${VITE_API_KEY}`
      );
      const data = await response.json();
      const officialTrailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailerKey(officialTrailer ? officialTrailer.key : "");
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    fetchTrailer(movie.id);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Banner Section */}
      {selectedMovie && (
        <div className="relative w-full h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
            }}
          />
          <div className="relative flex items-center justify-between h-full px-12">
            {/* Left: Movie Info */}
            <div className="w-1/2 space-y-4">
              <h1 className="text-4xl font-bold">{selectedMovie.title}</h1>
              <p className="text-lg">{selectedMovie.overview}</p>
              <p className="text-gray-300">
                Release Date: {selectedMovie.release_date}
              </p>
            </div>

            {/* Right: Trailer */}
            <div className="w-1/2 flex justify-end">
              {trailerKey ? (
                <iframe
                  className="w-3/4 h-[350px] rounded-lg shadow-lg"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                  title="Movie Trailer"
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <p className="text-gray-400">No Trailer Available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Movies List */}

      <div className="relative z-10 container mx-auto mt-8 px-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {movies &&
            movies.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-[250px]"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-300px object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovies;
