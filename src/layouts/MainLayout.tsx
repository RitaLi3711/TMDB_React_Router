// MainLayout.tsx
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from '@/hooks';

export const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'movie' | 'tv' | 'person'>('movie');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigatingFromSearch = useRef(false);

  useEffect(() => {
    // Don't trigger search if we just navigated from a search result
    if (isNavigatingFromSearch.current) {
      isNavigatingFromSearch.current = false;
      return;
    }

    // Don't trigger search on movie, tv, or person pages
    if (location.pathname.includes('/movie/') || 
        location.pathname.includes('/person/')) {
      return;
    }

    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}&type=${searchType}`);
    }
  }, [debouncedQuery, searchType, navigate, location.pathname]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleNavigateAway = () => {
    isNavigatingFromSearch.current = true;
  };

  return (
    <div className="min-h-screen bg-[#0d1821] text-[#f0f4ef]">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        onClearSearch={handleClearSearch}
        onNavigateAway={handleNavigateAway}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};