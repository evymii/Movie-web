import { Suspense } from "react";
import Navigation from "@/components/nav/page";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Movie, Genre } from "@/lib/types";
import Link from "next/link";

type GenrePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const GenreResults = async ({ params, searchParams }: GenrePageProps) => {
  const { id } = await params;
  const { page: pageParam } = await searchParams;
  const genreId = parseInt(id);
  const page = parseInt(pageParam || "1");

  const [genreMovies, genres] = await Promise.all([
    api.getMoviesByGenre(genreId, page),
    api.getGenres(),
  ]);

  const currentGenre = genres.genres.find((g: Genre) => g.id === genreId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <h1 className="text-2xl font-bold mb-4">
              {currentGenre?.name} Movies
            </h1>
            <p className="text-gray-600 mb-6">
              {genreMovies.total_results} movies found
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {genreMovies.results.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {genreMovies.total_pages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {page > 1 && (
                  <Link
                    href={`/genre/${genreId}?page=${page - 1}`}
                    className="px-4 py-2 text-white rounded transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#4338CA" }}
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 bg-gray-200 rounded">
                  Page {page} of {genreMovies.total_pages}
                </span>
                {page < genreMovies.total_pages && (
                  <Link
                    href={`/genre/${genreId}?page=${page + 1}`}
                    className="px-4 py-2 text-white rounded transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#4338CA" }}
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">All Genres</h2>
              <div className="space-y-2">
                {genres.genres.map((genre: Genre) => (
                  <Link
                    key={genre.id}
                    href={`/genre/${genre.id}`}
                    className={`block px-3 py-2 rounded transition-colors ${
                      genre.id === genreId ? "text-white" : "hover:bg-gray-50"
                    }`}
                    style={
                      genre.id === genreId ? { backgroundColor: "#4338CA" } : {}
                    }
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const GenrePage = (props: GenrePageProps) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-gray-300 h-96 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <GenreResults {...props} />
    </Suspense>
  );
};

export default GenrePage;
