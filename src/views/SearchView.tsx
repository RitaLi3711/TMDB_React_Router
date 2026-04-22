import { ImageGrid, Pagination, SearchBar } from '@/components';
import { SEARCH_ENDPOINT } from '@/core/constants';
import type { SearchResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';

export const SearchView = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const debouncedQuery = useDebounce(query, 500);
  const { data } = useTmdb<SearchResponse>(SEARCH_ENDPOINT, { query: debouncedQuery, page }, [debouncedQuery, page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
  }));

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  if (!data) {
    return <p className="text-center text-[#f0f4ef]">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-10 space-y-5">
      <SearchBar value={query} onChange={setQuery} />
      {data.results.length ? (
        <>
          <ImageGrid results={gridData} getHref={(id) => `/person/${id}`} />
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        </>
      ) : (
        <p className="text-center text-[#bfcc94]">No search results found</p>
      )}
    </section>
  );
};