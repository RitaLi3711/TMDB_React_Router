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

import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route element={<MainLayout />}>
        <Route path="/movies" element={<MoviesView />} >
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>

        <Route path="/search" element={<SearchView />} />
        <Route path="/trending" element={<TrendingView />} />
      </Route>

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};