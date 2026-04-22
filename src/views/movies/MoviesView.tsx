import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { MOVIES_VIEW_ENDPOINT } from '@/core/constants';
import type { MediaResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const { interval } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const category = interval || 'now_playing';

  const { data } = useTmdb<MediaResponse>(
    `${MOVIES_VIEW_ENDPOINT}/${category}`,
    { page },
    [category, page]
  );

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">

      <ButtonGroup
        value={category}
        onClick={(value: string) => {
          setPage(1);
          navigate(`/movies/category/${value}`);
        }}
        options={[
          { label: 'Now Playing', value: 'now_playing' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
          { label: 'Upcoming', value: 'upcoming' },
        ]}
      />

      <ImageGrid results={gridData} getHref={(id) => `/movie/${id}`} />

      <Pagination
        page={page}
        maxPages={data.total_pages}
        onClick={setPage}
      />
    </section>
  );
};