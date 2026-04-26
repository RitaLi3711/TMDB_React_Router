import { ImageGrid, Pagination } from '@/components';
import { useTmdb } from '@/hooks';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export const SearchView = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'movie';
  const [page, setPage] = useState(1);

  // Only fetch if query exists, otherwise pass empty string to disable the hook
  const { data } = useTmdb<{
    results: {
      id: number;
      title?: string;
      name?: string;
      poster_path?: string | null;
      profile_path?: string | null;
    }[];
    total_pages: number;
    page: number;
    total_results: number;
  }>(
    query ? `https://api.themoviedb.org/3/search/${type}` : '', // Use empty string instead of null
    query ? { query, page } : {}, // Only pass params if we have a query
    [query, type, page]
  );

  const getHref = (id: number): string => {
    if (type === 'movie') return `/movies/${id}`;
    if (type === 'tv') return `/tv/${id}`;
    return `/person/${id}`;
  };

  // Prepare grid data only if we have results
  const getGridData = () => {
    if (!data?.results) return [];
    return data.results
      .filter((item) => type === 'person' ? item.profile_path : item.poster_path)
      .map((item) => ({
        id: item.id,
        imagePath: (type === 'person' ? item.profile_path : item.poster_path) || null,
        primaryText: item.title || item.name || '',
      }));
  };

  const gridData = getGridData();

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      {/* Persistent Search Header */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">Search for:</h1>
        <span className="text-2xl text-gray-400">
          {query || 'Nothing'}
        </span>
      </div>

      {/* Conditional Content */}
      {!query && (
        <div className="space-y-2">
          <p className="text-gray-400">
            Enter a search term to find {type === 'movie' ? 'movies' : type === 'tv' ? 'TV shows' : 'people'}...
          </p>
        </div>
      )}

      {query && !data && (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400">
            <svg className="animate-spin h-8 w-8 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Searching for "{query}"...</p>
          </div>
        </div>
      )}

      {query && data && data.results.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-lg">No results found for "{query}"</p>
          <p className="text-gray-500 text-sm mt-2">Try different keywords or check your spelling</p>
        </div>
      )}

      {query && data && data.results.length > 0 && (
        <>
          <p className="text-gray-400">Found {data.total_results} results</p>
          
          {gridData.length > 0 ? (
            <ImageGrid results={gridData} getHref={getHref} />
          ) : (
            <p className="text-gray-400 text-center py-8">
              No {type === 'person' ? 'profile images' : 'posters'} available for these results
            </p>
          )}
          
          {data.total_pages > 1 && (
            <Pagination 
              page={page} 
              maxPages={Math.min(data.total_pages, 500)} 
              onClick={setPage} 
            />
          )}
        </>
      )}
    </section>
  );
};