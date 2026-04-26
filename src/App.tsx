import { MainLayout } from '@/layouts/MainLayout';
import {
  CreditsView,
  ErrorView,
  HomeView,
  MoviesView,
  MovieView,
  ReviewsView,
  SearchView,
  TelevisionView,
  TrendingView,
  SeasonsView,
  EpisodeView,
  TrailersView,
  GenreView,
} from '@/views';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <Routes location={backgroundLocation || location}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeView />} />

        <Route path="movies" element={<Navigate to="/movies/category/now_playing" replace />} />
        <Route path="movies/category/:interval" element={<MoviesView />} />

        <Route path="tv" element={<Navigate to="/tv/category/airing_today" replace />} />
        <Route path="tv/category/:interval" element={<TelevisionView />} />

        <Route path="trending" element={<TrendingView />} />
        
        <Route path="genre" element={<GenreView />} />  {/* Add this line */}

               <Route path="search" element={<SearchView />} />

        <Route path="movies/:id" element={<MovieView />}>
          <Route index element={<Navigate to="credits" replace />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>

        <Route path="tv/:id" element={<MovieView />}>
          <Route index element={<Navigate to="seasons" replace />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="season/:seasonNumber" element={<EpisodeView />} />
        </Route>

        <Route path="*" element={<ErrorView />} />
      </Route>
    </Routes>
  );
};