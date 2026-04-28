import { ImageGrid, Pagination } from '@/components';
import { useTmdb } from '@/hooks';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { FaFrown } from 'react-icons/fa';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';

export const SearchView = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
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
  }>(
    `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}`,
    {},
    [query, page]
  );

  // Store media types in a map for the onClick handler
  const mediaTypeMap = new Map<number, string>();
  
  const gridData: ImageCell[] = (data?.results ?? [])
    .filter((item) => item.poster_path || item.profile_path)
    .map((item) => {
      const imagePath = (item.poster_path || item.profile_path) ?? '';
      mediaTypeMap.set(item.id, item.media_type);
      return {
        id: item.id,
        imageUrl: `${IMAGE_BASE_URL}${imagePath}`,
        primaryText: item.title || item.name || '',
        secondaryText: item.media_type,
      };
    });

  const handleClick = (id: number) => {
    const mediaType = mediaTypeMap.get(id);
    if (mediaType === 'movie') window.location.href = `/movies/${id}`;
    else if (mediaType === 'tv') window.location.href = `/tv/${id}`;
    else window.location.href = `/person/${id}`;
  };

  if (!query) return null;

  if (!data) {
    return <p className="text-center text-[#f0f4ef]">Loading...</p>;
  }

  if (data.results.length === 0) {
    return (
      <div className="text-center py-12">
        <FaFrown className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <p className="text-gray-400 text-lg">No results found</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <ImageGrid 
        results={gridData} 
        onClick={handleClick}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};