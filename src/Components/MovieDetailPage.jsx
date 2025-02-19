import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../Utils/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "./LoaderSlice/loadingSlice";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const MovieDetailPage = () => {
  const { movieId } = useParams(); // Get movie ID from URL params
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading); // ✅ Corrected selector

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        dispatch(showLoading()); // Show loader before fetching

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${VITE_API_KEY}&append_to_response=credits,videos`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        dispatch(hideLoading()); // Hide loader after fetching
      }
    };

    fetchMovieDetails();
  }, [movieId, dispatch]);

  //  Show loading spinner
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <LoadingSpinner className="text-white w-16 h-16" />
      </div>
    );
  }

  //   no details are found
  if (!movieDetails) {
    return (
      <div className="text-white text-center">Movie details not found.</div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      {/* Movie Details Section */}
      <div className="max-w-5xl mx-auto bg-black p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
        {/* Movie Poster */}
        <div className="relative ">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-64 h-auto rounded-lg shadow-lg"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2  item center bg-black bg-opacity-70 px-2 py-1 rounded-md">
            <span className="text-yellow-400 font-bold">IMDB</span>
            <span className="text-white ml-1">{movieDetails.vote_average}</span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="ml-0 md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
          <p className="text-gray-400 mt-2">{movieDetails.overview}</p>
          <p className="mt-2">
            <strong>Release Date:</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>

          {/* Movie Trailer */}
          {movieDetails.videos?.results.length > 0 && (
            <iframe
              className="mt-4 w-full h-52 md:h-64 rounded-lg"
              src={`https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-5xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movieDetails.credits?.cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="w-28 h-36 object-cover rounded-lg mx-auto"
              />
              <p className="mt-2 text-sm font-semibold">{actor.name}</p>
              <p className="text-gray-400 text-xs">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
