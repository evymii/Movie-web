const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return response.json();
};

const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return response.json();
};

const getNowPlayingMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return response.json();
};

const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return response.json();
};

const searchMovies = async (query: string, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`
  );
  return response.json();
};

const getMovieDetails = async (movieId: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
};

const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`
  );
  return response.json();
};

const getMoviesByGenre = async (genreId: number, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en&with_genres=${genreId}&page=${page}`
  );
  return response.json();
};

const getMovieVideos = async (movieId: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
};

const getMovieCredits = async (movieId: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.json();
};

const getSimilarMovies = async (movieId: number, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return response.json();
};

const getPosterUrl = (posterPath: string | null, size = "w500") => {
  if (!posterPath) return "/images/placeholder.svg";
  return `${IMAGE_BASE_URL}/${size}${posterPath}`;
};

const getBackdropUrl = (backdropPath: string | null, size = "w1280") => {
  if (!backdropPath) return "/images/placeholder.svg";
  return `${IMAGE_BASE_URL}/${size}${backdropPath}`;
};

const tmdbApi = {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  searchMovies,
  getMovieDetails,
  getGenres,
  getMoviesByGenre,
  getMovieVideos,
  getMovieCredits,
  getSimilarMovies,
  getPosterUrl,
  getBackdropUrl,
};

export default tmdbApi;
