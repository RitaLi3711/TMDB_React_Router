import { Link } from '@/components';

export const Header = () => {
  return (
    <>
      {/* MAIN HEADER ONLY */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-white">TMDB Explorer</h1>

            <Link to="/now-playing">Movies</Link>
            <Link to="/tv">TV</Link>
            <Link to="/trending?interval=day">Trending</Link>
            <Link to="/genre">Genre</Link>
          </div>

          {/* Right Side */}
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

      {/* BUTTONS BELOW HEADER */}
      <div className="max-w-7xl mx-auto px-5 pt-5 flex gap-5">
        <button className="px-6 py-3 rounded-xl bg-white text-slate-900 font-medium">
          Now Playing
        </button>

        <button className="px-6 py-3 rounded-xl bg-slate-700 text-white">
          Popular
        </button>

        <button className="px-6 py-3 rounded-xl bg-slate-700 text-white">
          Top Rated
        </button>

        <button className="px-6 py-3 rounded-xl bg-slate-700 text-white">
          Upcoming
        </button>
      </div>
    </>
  );
};