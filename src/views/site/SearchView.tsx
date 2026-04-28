import { ImageGrid, Pagination } from '@/components';
import { useTmdb } from '@/hooks';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaFrown } from 'react-icons/fa';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'movie';
  const [page, setPage] = useState(1);

  const { data } = useTmdb<{
    results: Array<{
      id: number;
      title?: string;
      name?: string;
      poster_path?: string | null;
      profile_path?: string | null;
      media_type: string;
    }>;
    total_pages: number;
    total_results: number;
  }>(
    query ? `https://api.themoviedb.org/3/search/${type}?query=${query}&page=${page}` : '',
    query ? {} : {},
    [query, type, page]
  );

  const mediaTypeMap = new Map<number, string>();
  
  const gridData: ImageCell[] = (data?.results ?? []).map((item) => {
    const imagePath = type === 'person' ? item.profile_path : item.poster_path;
    const imageUrl = imagePath ? `${IMAGE_BASE_URL}${imagePath}` : '';
    mediaTypeMap.set(item.id, type === 'person' ? 'person' : type);
    return {
      id: item.id,
      imageUrl,
      primaryText: item.title || item.name || '',
      secondaryText: '',
    };
  });

  const handleClick = (id: number) => {
    const mediaType = mediaTypeMap.get(id);
    if (mediaType === 'movie') navigate(`/movies/${id}`);
    else if (mediaType === 'tv') navigate(`/tv/${id}`);
    else navigate(`/person/${id}`);
  };

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">Search for:</h1>
        <span className="text-2xl text-gray-400">{query || 'Nothing'}</span>
      </div>
      
      {!query && (
        <p className="text-gray-400">Enter a search term to find movies, TV shows, or people...</p>
      )}

      {query && !data && (
        <p className="text-center text-[#f0f4ef]">Loading...</p>
      )}

      {query && data && data.results.length === 0 && (
        <div className="text-center py-12">
          <FaFrown className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No results found for "{query}"</p>
        </div>
      )}

      {query && data && data.results.length > 0 && (
        <>
          <p className="text-gray-400">Found {data.total_results} results</p>
          <ImageGrid results={gridData} onClick={handleClick} />
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        </>
      )}
    </section>
  );
};