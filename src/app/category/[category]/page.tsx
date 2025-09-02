import { Suspense } from "react";
import Navigation from "@/components/nav/page";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Movie } from "@/lib/types";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const getCategoryData = async (category: string, page: number) => {
  switch (category) {
    case "popular":
      return api.getPopularMovies(page);
    case "upcoming":
      return api.getUpcomingMovies(page);
    case "now-playing":
      return api.getNowPlayingMovies(page);
    case "top-rated":
      return api.getTopRatedMovies(page);
    default:
      throw new Error("Invalid category");
  }
};

const getCategoryTitle = (category: string) => {
  switch (category) {
    case "popular":
      return "Popular Movies";
    case "upcoming":
      return "Upcoming Movies";
    case "now-playing":
      return "Now Playing";
    case "top-rated":
      return "Top Rated Movies";
    default:
      return "Movies";
  }
};

const CategoryResults = async ({ params, searchParams }: CategoryPageProps) => {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1");

  const categoryData = await getCategoryData(category, page);
  const title = getCategoryTitle(category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">
          {categoryData.total_results} movies found
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {categoryData.total_pages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {page > 1 && (
              <Link
                href={`/category/${category}?page=${page - 1}`}
                className="px-4 py-2 text-white rounded transition-colors hover:opacity-90"
                style={{ backgroundColor: "#4338CA" }}
              >
                Previous
              </Link>
            )}
            <span className="px-4 py-2 bg-gray-200 rounded">
              Page {page} of {categoryData.total_pages}
            </span>
            {page < categoryData.total_pages && (
              <Link
                href={`/category/${category}?page=${page + 1}`}
                className="px-4 py-2 text-white rounded transition-colors hover:opacity-90"
                style={{ backgroundColor: "#4338CA" }}
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const CategoryPage = (props: CategoryPageProps) => {
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
      <CategoryResults {...props} />
    </Suspense>
  );
};

export default CategoryPage;
