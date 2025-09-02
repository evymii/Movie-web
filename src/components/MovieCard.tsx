import { Movie } from "@/lib/types";
import api from "@/lib/api";
import Link from "next/link";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = api.getPosterUrl(movie.poster_path);

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer w-full h-[440px] flex flex-col">
        <div className="flex-1 relative">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between h-32">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 px-2">
            {movie.title}
          </h3>
          <div className="flex items-center px-2">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 text-sm font-medium text-gray-700">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}/10
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
