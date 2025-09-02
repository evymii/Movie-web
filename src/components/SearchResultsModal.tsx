"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import type { Movie } from "@/lib/types";

type SearchResultsModalProps = {
  query: string;
  onClose: () => void;
};

const SearchResultsModal = ({ query, onClose }: SearchResultsModalProps) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const searchMovies = async () => {
      setLoading(true);
      try {
        const results = await api.searchMovies(query, 1);
        setSearchResults(results.results.slice(0, 8));
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchMovies, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  if (query.trim() === "") {
    return null;
  }

  return (
    <div className="flex md:w-[600px] md:h-[400px] overflow-scroll sm:w-[400px] sm:h-[600px] absolute bg-white flex-col shadow-2xl items-start gap-4 rounded-2xl z-50">
      <div className="flex flex-col h-[80px] p-5 w-full">
        <h1 className="font-bold text-2xl">Search Results</h1>
        <h4 className="text-gray-600">Results for &quot;{query}&quot;</h4>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mx-2"></div>

      <div className="flex flex-col w-full px-5 pb-5">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            {searchResults.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <img
                  src={api.getPosterUrl(movie.poster_path, "w92")}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                    <span>•</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-800 font-medium">
                  See more →
                </button>
              </Link>
            ))}
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="text-center text-purple-600 hover:text-purple-800 font-medium py-2 mt-2"
              onClick={onClose}
            >
              See all results for &quot;{query}&quot;
            </Link>
          </>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No results found for &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsModal;
