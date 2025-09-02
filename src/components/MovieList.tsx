import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";
import Link from "next/link";

type MovieListProps = {
  movies: Movie[];
  title: string;
  seeAllLink?: string;
};

const MovieList = ({ movies, title, seeAllLink }: MovieListProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {seeAllLink && (
          <Link
            href={seeAllLink}
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "#4338CA" }}
          >
            See All →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
