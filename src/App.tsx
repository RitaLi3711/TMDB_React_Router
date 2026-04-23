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
  SeasonsView
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
          <Route path="tv/:id" element={<SeasonsView />} />
          <Route index element={<Navigate to="credits" replace />} />
          <Route path="credit" element={<CreditsView />} />
            <Route path="reviews" element={<ReviewsView />} />
        </Route>

        <Route path="*" element={<ErrorView />} />
      </Routes>
    </>
  );
};