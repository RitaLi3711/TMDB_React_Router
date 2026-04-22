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
} from '@/views';

// Import these directly from their files
import { SeasonsView } from '@/views/SeasonsView';
import { EpisodeView } from '@/views/EpisodeView';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomeView />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="movies" element={<Navigate to="/movies/category/now_playing" replace />} />
          <Route path="movies/category/:interval" element={<MoviesView />} />

          <Route path="tv" element={<Navigate to="/tv/category/airing_today" replace />} />
          <Route path="tv/category/:interval" element={<TelevisionView />} />

          {/* MOVIE DETAIL ROUTES */}
          <Route path="movies/:id" element={<MovieView />}>
            <Route index element={<Navigate to="credits" replace />} />
            <Route path="credits" element={<CreditsView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>

          {/* TV SEASONS AND EPISODES ROUTES */}
          <Route path="tv/:id/seasons" element={<SeasonsView />} />
          <Route path="tv/:id/season/:seasonNumber/episodes" element={<EpisodeView />} />

          <Route path="search" element={<SearchView />} />
          <Route path="trending" element={<TrendingView />} />
        </Route>

        <Route path="*" element={<ErrorView />} />
      </Routes>

      {/* MODAL OVERLAY */}
      {backgroundLocation && (
        <Routes>
          <Route path="movies/:id" element={<MovieView />}>
            <Route index element={<Navigate to="credits" replace />} />
            <Route path="credits" element={<CreditsView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>

          {/* TV MODALS */}
          <Route path="tv/:id/seasons" element={<SeasonsView />} />
          <Route path="tv/:id/season/:seasonNumber/episodes" element={<EpisodeView />} />
        </Routes>
      )}
    </>
  );
};