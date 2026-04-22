import { Link } from '@/components';

export const Header = () => {
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
          
          <Link to="/trending?interval=day">
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
            className="w-64 px-5 py-3 rounded-2xl bg-[#344966] text-[#f0f4ef] outline-none placeholder:text-[#bfcc94]"
          />

          <button className="px-6 py-3 rounded-2xl bg-[#e6aace] text-[#0d1821] font-medium hover:bg-[#d495b8] transition">
            Movies
          </button>

          <button className="px-6 py-3 rounded-2xl bg-[#344966] text-[#f0f4ef] font-medium hover:bg-[#2a3b52] transition">
            TV
          </button>

          <button className="px-6 py-3 rounded-2xl bg-[#344966] text-[#f0f4ef] font-medium hover:bg-[#2a3b52] transition">
            Person
          </button>
        </div>
      </div>
    </header>
  );
};