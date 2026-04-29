import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from '@/hooks';

export const Header = () => {  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'movie' | 'tv' | 'person'>('movie');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigating = useRef(false);

  useEffect(() => {
    if (isNavigating.current) return;
    
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}&type=${searchType}`);
    }
  }, [debouncedQuery, searchType, navigate]);

  const handleNavClick = (path: string) => {
    isNavigating.current = true;
    setSearchQuery(''); // Clear the search input
    navigate(path);
    // Reset after navigation
    setTimeout(() => {
      isNavigating.current = false;
    }, 500);
  };

  // Helper function to check if TV route is active (excluding trending/tv)
  const isTvActive = () => {
    const path = location.pathname;
    return (path.startsWith('/tv/') || path === '/tv') && !path.startsWith('/trending/tv');
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

          <button
            onClick={() => handleNavClick('/movies/category/now_playing')}
            className={`px-4 py-2 rounded-md transition-all duration-200 border ${
              location.pathname.includes('/movies')
                ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
                : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]'
            }`}
          >
            Movies
          </button>
          
          <button
            onClick={() => handleNavClick('/tv/category/airing_today')}
            className={`px-4 py-2 rounded-md transition-all duration-200 border ${
              isTvActive()
                ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
                : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]'
            }`}
          >
            TV
          </button>
          
          <button
            onClick={() => handleNavClick('/trending')}
            className={`px-4 py-2 rounded-md transition-all duration-200 border ${
              location.pathname.includes('/trending')
                ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
                : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]'
            }`}
          >
            Trending
          </button>
          
          <button
            onClick={() => handleNavClick('/genre')}
            className={`px-4 py-2 rounded-md transition-all duration-200 border ${
              location.pathname.includes('/genre')
                ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
                : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]'
            }`}
          >
            Genre
          </button>
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