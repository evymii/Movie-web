import Navigation from "@/components/nav/page";
import MovieList from "@/components/MovieList";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";
import api from "@/lib/api";

const Home = async () => {
  const [popularMovies, upcomingMovies, nowPlayingMovies, topRatedMovies] =
    await Promise.all([
      api.getPopularMovies(),
      api.getUpcomingMovies(),
      api.getNowPlayingMovies(),
      api.getTopRatedMovies(),
    ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSlider
        movies={nowPlayingMovies.results
          .filter((movie) => movie.backdrop_path)
          .slice(0, 5)}
      />
      <div className="container mx-auto px-4 py-8">
        <MovieList
          movies={upcomingMovies.results.slice(0, 10)}
          title="Upcoming Movies"
          seeAllLink="/category/upcoming"
        />
        <MovieList
          movies={popularMovies.results.slice(0, 8)}
          title="Popular Movies"
          seeAllLink="/category/popular"
        />
        <MovieList
          movies={topRatedMovies.results.slice(0, 8)}
          title="Top Rated"
          seeAllLink="/category/top-rated"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
