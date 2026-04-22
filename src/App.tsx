import { MainLayout } from '@/layouts/MainLayout';

import {
  CreditsView,
  ErrorView,
  HomeView,
  MoviesView,
  ReviewsView,
  SearchView,
  TrendingView,
} from '@/views';

import { Route, Routes, Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route element={<MainLayout />}>
        <Route
          path="/movies"
          element={<Navigate to="/movies/category/now_playing" replace />}
        />

        <Route path="/movies/category/:interval" element={<MoviesView />} />

        <Route path="/search" element={<SearchView />} />
        <Route path="/trending" element={<TrendingView />} />
      </Route>

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};