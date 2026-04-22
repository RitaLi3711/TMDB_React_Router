import { MainLayout } from '@/layouts/MainLayout';

import {
  CreditsView,
  ErrorView,
  HomeView,
  MovieView,
  NowPlayingView,
  ReviewsView,
  SearchView,
  TrendingView,
  PopularView,
  TopRatedView,
  UpcomingView,
} from '@/views';

import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route element={<MainLayout />}>
        <Route path="/now-playing" element={<NowPlayingView />} />
        <Route path="/popular" element={<PopularView />} />
        <Route path="/top-rated" element={<TopRatedView />} />
        <Route path="/upcoming" element={<UpcomingView />} />

        <Route path="/search" element={<SearchView />} />

        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>

        <Route path="/trending" element={<TrendingView />} />
      </Route>

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};