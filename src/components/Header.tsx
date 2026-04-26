import { Link } from '@/components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks';

export const Header = () => {  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'movie' | 'tv' | 'person'>('movie');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}&type=${searchType}`);
    }
  }, [debouncedQuery, searchType, navigate]);

  return (
    <header className="bg-[#0d1821] border-b border-[#344966] sticky top-0 z-50">
      <div className="flex items-center justify-between gap-20 px-4 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-[#f0f4ef]">TMDB Explorer</h1>

          <Link to="/movies/category/now_playing" match={['/movies']}>
            Movies
          </Link>
          
          <Link to="/tv/category/airing_today" match={['/tv']}>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-80 px-5 py-3 rounded-2xl bg-[#344966] text-[#f0f4ef] outline-none placeholder:text-[#bfcc94] focus:ring-2 focus:ring-[#bfcc94]"
          />

          <button
            type="button"
            onClick={() => setSearchType('movie')}
            className={`px-6 py-3 rounded-2xl transition ${
              searchType === 'movie'
                ? 'bg-[#bfcc94] text-[#0d1821] font-medium'
                : 'bg-[#344966] text-[#f0f4ef] hover:bg-[#2a3b52]'
            }`}
          >
            Movies
          </button>

          <button
            type="button"
            onClick={() => setSearchType('tv')}
            className={`px-6 py-3 rounded-2xl transition ${
              searchType === 'tv'
                ? 'bg-[#bfcc94] text-[#0d1821] font-medium'
                : 'bg-[#344966] text-[#f0f4ef] hover:bg-[#2a3b52]'
            }`}
          >
            TV
          </button>

          <button
            type="button"
            onClick={() => setSearchType('person')}
            className={`px-6 py-3 rounded-2xl transition ${
              searchType === 'person'
                ? 'bg-[#bfcc94] text-[#0d1821] font-medium'
                : 'bg-[#344966] text-[#f0f4ef] hover:bg-[#2a3b52]'
            }`}
          >
            Person
          </button>
        </div>
      </div>
    </header>
  );
};