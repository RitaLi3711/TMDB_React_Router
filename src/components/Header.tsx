import { Link } from '@/components';

export const Header = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-20 px-4 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">TMDB Explorer</h1>

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
            className="w-64 px-5 py-3 rounded-2xl bg-slate-700 text-white outline-none placeholder:text-gray-400"
          />

          <button className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium">
            Movies
          </button>

          <button className="px-6 py-3 rounded-2xl bg-slate-700 text-white font-medium">
            TV
          </button>

          <button className="px-6 py-3 rounded-2xl bg-slate-700 text-white font-medium">
            Person
          </button>
        </div>
      </div>
    </header>
  );
};