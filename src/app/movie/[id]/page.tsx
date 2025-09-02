import { Movie, Video, Genre, Crew, Cast } from "@/lib/types";
import api from "@/lib/api";
import Navigation from "@/components/nav/page";
import TrailerButton from "@/components/TrailerButton";
import Footer from "@/components/Footer";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const MoviePage = async ({ params }: MoviePageProps) => {
  const { id } = await params;
  const movieId = parseInt(id);

  const [movieDetails, videos, similarMovies, credits] = await Promise.all([
    api.getMovieDetails(movieId),
    api.getMovieVideos(movieId),
    api.getSimilarMovies(movieId),
    api.getMovieCredits(movieId),
  ]);

  const trailer = videos.results.find(
    (video: Video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{movieDetails.title}</h1>
          <div className="flex items-center gap-4 text-lg text-gray-600">
            <span>{new Date(movieDetails.release_date).getFullYear()}</span>
            <span>•</span>
            <span>PG</span>
            <span>•</span>
            <span>{movieDetails.runtime} min</span>
            <div className="flex items-center ml-4">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="ml-1 font-medium">
                {movieDetails.vote_average.toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <img
                  src={api.getPosterUrl(movieDetails.poster_path, "w500")}
                  alt={movieDetails.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="relative">
                <img
                  src={api.getPosterUrl(movieDetails.poster_path, "w500")}
                  alt={movieDetails.title}
                  className="w-full rounded-lg shadow-lg"
                />
                {trailer && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrailerButton
                      trailer={trailer}
                      movieTitle={movieDetails.title}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-2xl">★</span>
              <span className="ml-2 text-xl font-medium">
                {movieDetails.vote_average.toFixed(1)}/10
              </span>
              <span className="ml-2 text-sm text-gray-600">
                ({movieDetails.vote_count.toLocaleString()} votes)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {movieDetails.genres.map((genre: Genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: "#E0E7FF", color: "#4338CA" }}
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="text-lg mb-8 leading-relaxed max-w-4xl">
          {movieDetails.overview}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-2">Director</h3>
            <p className="text-gray-700">
              {credits.crew.find((person: Crew) => person.job === "Director")
                ?.name || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Writers</h3>
            <p className="text-gray-700">
              {credits.crew
                .filter(
                  (person: Crew) =>
                    person.job === "Writer" || person.job === "Screenplay"
                )
                .slice(0, 3)
                .map((person: Crew) => person.name)
                .join(" • ") || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Stars</h3>
            <p className="text-gray-700">
              {credits.cast
                .slice(0, 3)
                .map((actor: Cast) => actor.name)
                .join(" • ")}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">More Like This</h2>
            <a
              href="#"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#4338CA" }}
            >
              See more →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {similarMovies.results.slice(0, 5).map((movie: Movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={api.getPosterUrl(movie.poster_path, "w300")}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1 line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="ml-1 text-sm font-medium">
                      {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
