export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const ORIGINAL_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/* Base Endpoints */
export const MOVIE_ENDPOINT = 'https://api.themoviedb.org/3/movie';
export const TV_VIEW_ENDPOINT = 'https://api.themoviedb.org/3/tv';
export const TRENDING_ENDPOINT = 'https://api.themoviedb.org/3/trending/movie';
export const SEARCH_ENDPOINT = 'https://api.themoviedb.org/3/search/person';
export const POPULAR_ENDPOINT = 'https://api.themoviedb.org/3/movie/popular';
export const TOP_RATED_ENDPOINT = 'https://api.themoviedb.org/3/movie/top_rated';
export const UPCOMING_ENDPOINT = 'https://api.themoviedb.org/3/movie/upcoming';

/* TV Show Categories */
export const TV_AIRING_TODAY = 'https://api.themoviedb.org/3/tv/airing_today';
export const TV_ON_THE_AIR = 'https://api.themoviedb.org/3/tv/on_the_air';
export const TV_POPULAR = 'https://api.themoviedb.org/3/tv/popular';
export const TV_TOP_RATED = 'https://api.themoviedb.org/3/tv/top_rated';