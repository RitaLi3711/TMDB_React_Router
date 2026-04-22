import { MainLayout } from '@/layouts/MainLayout';
import {
  CreditsView,
  ErrorView,
  HomeView,
  MoviesView,
  MovieView,
  ReviewsView,
  SearchView,
  TrendingView,
} from '@/views';

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
          <Route
            path="movies"
            element={<Navigate to="/movies/category/now_playing" replace />}
          />

          <Route path="movies/category/:interval" element={<MoviesView />} />

          {/* MOVIE ROUTES */}
          <Route path="movies/:id" element={<MovieView />}>
            {/* DEFAULT REDIRECT */}
            <Route index element={<Navigate to="credits" replace />} />

            <Route path="credits" element={<CreditsView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>

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
        </Routes>
      )}
    </>
  );
};