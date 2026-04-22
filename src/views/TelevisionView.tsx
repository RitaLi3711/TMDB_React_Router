import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { TV_VIEW_ENDPOINT } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const { interval } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  // keep fallback safe
  const category = interval ?? 'airing_today';

  const { data } = useTmdb<any>(
    `${TV_VIEW_ENDPOINT}/${category}`,
    { page },
    [category, page]
  );

  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name || result.original_title || '',
  }));

  const handleCategoryChange = (value: string) => {
    setPage(1);
    navigate(`/tv/category/${value}`);
  };

  if (!data) {
    return <p className="text-center text-[#f0f4ef]">Loading...</p>;
  }

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <ButtonGroup
        value={category}
        onClick={handleCategoryChange}
        options={[
          { label: 'Airing Today', value: 'airing_today' },
          { label: 'On The Air', value: 'on_the_air' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
        ]}
      />

      <ImageGrid
        results={gridData}
        getHref={(id) => `/tv/${id}`}
      />

      <Pagination
        page={page}
        maxPages={data.total_pages}
        onClick={setPage}
      />
    </section>
  );
};