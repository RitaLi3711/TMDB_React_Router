// Header.tsx
import { Link } from '@/components';
import { ButtonGroup } from '../controls/buttons/ButtonGroup';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: 'movie' | 'tv' | 'person';
  setSearchType: (type: 'movie' | 'tv' | 'person') => void;
  onClearSearch: () => void;
  onNavigateAway: () => void;
};

export const Header = ({ searchQuery, setSearchQuery, searchType, setSearchType, onClearSearch, onNavigateAway }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    onClearSearch();
    onNavigateAway();
    navigate('/');
  };

  const handleLinkClick = (path: string) => {
    onClearSearch();
    onNavigateAway();
    navigate(path);
  };

  return (
    <header className="bg-[#0d1821] border-b border-[#344966] sticky top-0 z-50">
      <div className="flex items-center justify-between gap-20 px-4 py-4">
        <div className="flex items-center gap-4">
          <h1 
            onClick={handleLogoClick}
            className="text-4xl font-bold text-[#f0f4ef] cursor-pointer"
          >
            TMDB Explorer
          </h1>

          <div onClick={() => handleLinkClick('/movies/category/now_playing')}>
            <Link to="/movies/category/now_playing" match={['/movies']}>
              Movies
            </Link>
          </div>

          <div onClick={() => handleLinkClick('/tv/category/airing_today')}>
            <Link to="/tv/category/airing_today" match={['/tv']}>
              TV
            </Link>
          </div>

          <div onClick={() => handleLinkClick('/trending/movie')}>
            <Link to="/trending/movie" match={['/trending']}>
              Trending
            </Link>
          </div>

          <div onClick={() => handleLinkClick('/genre')}>
            <Link to="/genre" match={['/genre']}>
              Genre
            </Link>
          </div>
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