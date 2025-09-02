export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetails = Movie & {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
};

export type VideosResponse = {
  id: number;
  results: Video[];
};

export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type Crew = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
