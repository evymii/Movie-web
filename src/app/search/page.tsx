import { Suspense } from "react";
import Navigation from "@/components/nav/page";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Movie, Genre } from "@/lib/types";
import Link from "next/link";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

const SearchResults = async ({ searchParams }: SearchPageProps) => {
  const { q: query = "", page: pageParam = "1" } = await searchParams;
  const page = parseInt(pageParam);

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
          <p className="text-gray-600">Enter a search term to find movies.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const [searchResults, genres] = await Promise.all([
    api.searchMovies(query, page),
    api.getGenres(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <h1 className="text-2xl font-bold mb-4">
              Search Results for &quot;{query}&quot;
            </h1>
            <p className="text-gray-600 mb-6">
              {searchResults.total_results} results found
            </p>

            {searchResults.results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No movies found for &quot;{query}&quot;
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.results.map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}

            {searchResults.total_pages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {page > 1 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${
                      page - 1
                    }`}
                    className="px-4 py-2 text-white rounded transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#4338CA" }}
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 bg-gray-200 rounded">
                  Page {page} of {searchResults.total_pages}
                </span>
                {page < searchResults.total_pages && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${
                      page + 1
                    }`}
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
              <h2 className="text-xl font-bold mb-4">Search by Genre</h2>
              <div className="space-y-2">
                {genres.genres.map((genre: Genre) => (
                  <Link
                    key={genre.id}
                    href={`/genre/${genre.id}`}
                    className="block px-3 py-2 rounded transition-colors hover:bg-gray-50"
                    style={{ color: "#4338CA" }}
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

const SearchPage = (props: SearchPageProps) => {
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
      <SearchResults {...props} />
    </Suspense>
  );
};

export default SearchPage;
