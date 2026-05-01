// Header.tsx
import { Link, SearchBar } from '@/components';
import type { SearchType } from '@/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from '../controls/buttons/ButtonGroup';

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<SearchType>('movie');

  return (
    <header className="bg-[#0d1821] border-b border-[#344966] sticky top-0 z-50">
      <div className="flex items-center justify-between gap-20 px-4 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-[#f0f4ef] cursor-pointer">TMDB Explorer</h1>

          <div onClick={() => navigate('/movies/category/now_playing')}>
            <Link to="/movies/category/now_playing" match={['/movies']}>
              Movies
            </Link>
          </div>

          <div onClick={() => navigate('/tv/category/airing_today')}>
            <Link to="/tv/category/airing_today" match={['/tv']}>
              TV
            </Link>
          </div>

          <div onClick={() => navigate('/trending/movie')}>
            <Link to="/trending/movie" match={['/trending']}>
              Trending
            </Link>
          </div>

          <div onClick={() => navigate('/genre')}>
            <Link to="/genre" match={['/genre']}>
              Genre
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar
            value={query}
            onChange={(query) => {
              setQuery(query);
              navigate(`/search?q=${query}&type=${type}`);
            }}
          />
          <ButtonGroup
            value={type}
            options={[
              { label: 'Movie', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            onClick={(value: string) => {
              setType(value as SearchType);
              navigate(`/search?q=${query}&type=${value}`);
            }}
          />
        </div>
      </div>
    </header>
  );
};
