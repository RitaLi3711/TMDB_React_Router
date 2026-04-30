import { ImageGrid, Pagination } from '@/components';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    {},
    [query, type, page]
  );

  const gridData: ImageCell[] = useMemo(() => 
    (data?.results ?? []).map((item) => {
      const imagePath = item.profile_path ?? item.poster_path;
      const imageUrl = `${IMAGE_BASE_URL}${imagePath}`;
      return {
        id: item.id,
        imageUrl,
        primaryText: item.title || item.name || '',
        secondaryText: '',
        mediaType: type,
      };
    }), [data?.results, type]
  );

  if (!query || !data?.results?.length) return null;

  return (
    <>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/${type}/${id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </>
  );
};