import { Link } from '@/components';
import { useDebounce } from '@/hooks';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from '../controls/buttons/ButtonGroup';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'movie' | 'tv' | 'person'>('movie');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const isNavigating = useRef(false);

  useEffect(() => {
    if (isNavigating.current) return;

    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}&type=${searchType}`);
    }
  }, [debouncedQuery, searchType, navigate]);

  const handleNavClick = (path: string) => {
    isNavigating.current = true;
    setSearchQuery('');
    navigate(path);
    setTimeout(() => {
      isNavigating.current = false;
    }, 500);
  };

  return (
    <header className="bg-[#0d1821] border-b border-[#344966] sticky top-0 z-50">
      <div className="flex items-center justify-between gap-20 px-4 py-4">
        <div className="flex items-center gap-4">
          <h1 
            onClick={() => handleNavClick('/')} 
            className="text-4xl font-bold text-[#f0f4ef] cursor-pointer"
          >
            TMDB Explorer
          </h1>

          <Link to="/movies/category/now_playing">
            Movies
          </Link>

          <Link to="/tv/category/airing_today">
            TV
          </Link>

          <Link to="/trending">
            Trending
          </Link>

          <Link to="/genre">
            Genre
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md bg-[#344966] text-[#f0f4ef] placeholder-gray-400 border border-[#344966] focus:outline-none focus:border-[#e6aace]"
          />
          <ButtonGroup
            value={searchType}
            options={[
              { label: 'Movie', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            onClick={(value) => setSearchType(value as 'movie' | 'tv' | 'person')}
          />
        </div>
      </div>
    </header>
  );
};