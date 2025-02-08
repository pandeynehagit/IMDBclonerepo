import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../Context/MoviesContext";
import RatingCircle from "../Utils/RatingCircle";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Utils/LoadingSpinner";
const MovieDetailPage = () => {
  const { movieId } = useParams(); // Get the movie ID from URL params
  const { movieDetails, fetchMovieDetails, loadingSpinner } =
    useContext(MoviesContext);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchMovieDetails(movieId);
    // Fetch details when the component is mounted
  }, [movieId, fetchMovieDetails]);

  if (!movieDetails)
    return <div className="text-white text-center">Loading...</div>;

  return (
    <>
      {loadingSpinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="bg-gray-900 min-h-screen text-white p-8">
        {/* Movie Details Section */}
        <div className="  max-w-5xl mx-auto bg-black p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
          {/* Movie Poster */}
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-64 h-auto rounded-lg shadow-lg"
            />
            <div className="absolute">
              <RatingCircle rating={movieDetails.vote_average} />
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
            {movieDetails.videos.results.length > 0 && (
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
            {movieDetails.credits.cast.slice(0, 10).map((actor) => (
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
    </>
  );
};

export default MovieDetailPage;
