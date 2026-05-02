import { Button, ButtonGroup, ImageGrid, Pagination } from '@/components';
import { GENRE_ENDPOINT, IMAGE_BASE_URL, type GenreResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const movieGenres = [
  { label: 'Action', value: 28, slug: 'action' },
  { label: 'Adventure', value: 12, slug: 'adventure' },
  { label: 'Animation', value: 16, slug: 'animation' },
  { label: 'Crime', value: 80, slug: 'crime' },
  { label: 'Family', value: 10751, slug: 'family' },
  { label: 'Fantasy', value: 14, slug: 'fantasy' },
  { label: 'History', value: 36, slug: 'history' },
  { label: 'Horror', value: 27, slug: 'horror' },
  { label: 'Mystery', value: 9648, slug: 'mystery' },
  { label: 'Sci-Fi', value: 878, slug: 'sci-fi' },
];

const tvGenres = [
  { label: 'Action', value: 10759, slug: 'action' },
  { label: 'Animation', value: 16, slug: 'animation' },
  { label: 'Comedy', value: 35, slug: 'comedy' },
  { label: 'Crime', value: 80, slug: 'crime' },
  { label: 'Documentary', value: 99, slug: 'documentary' },
  { label: 'Drama', value: 18, slug: 'drama' },
  { label: 'Family', value: 10751, slug: 'family' },
  { label: 'Kids', value: 10762, slug: 'kids' },
  { label: 'Mystery', value: 9648, slug: 'mystery' },
  { label: 'Sci-Fi', value: 10765, slug: 'sci-fi' },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const { type: urlType, genreSlug } = useParams();
  const type = urlType === 'tv' ? 'tv' : 'movie';
  const genres = type === 'movie' ? movieGenres : tvGenres;
  const selectedGenre = genreSlug ? genres.find((g) => g.slug === genreSlug)?.value || genres[0].value : genres[0].value;
  const [page, setPage] = useState(1);
  const { data } = useTmdb<GenreResponse>(`${GENRE_ENDPOINT}/${type}`, { with_genres: selectedGenre, page }, [type, selectedGenre, page]);
  
  if (!data) return <p className="text-center text-gray-400">Loading genres...</p>;

  // ✅ Add return here!
  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <ButtonGroup
        value={type}
        onClick={(value) => {
          const newType = value as 'movie' | 'tv';
          const newGenres = newType === 'movie' ? movieGenres : tvGenres;
          const defaultGenre = newGenres[0];
          navigate(`/genre/${newType}/${defaultGenre.slug}`);
        }}
        options={[
          { label: 'Movies', value: 'movie' },
          { label: 'TV', value: 'tv' },
        ]}
      />

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Button
            key={genre.value}
            variant={selectedGenre === genre.value ? 'primary' : 'grey'}
            onClick={() => navigate(`/genre/${type}/${genre.slug}`)}
          >
            {genre.label}
          </Button>
        ))}
      </div>

      <ImageGrid
        results={(data.results || []).map((item) => ({
          id: item.id,
          imageUrl: `${IMAGE_BASE_URL}${item.poster_path ?? ''}`,
          primaryText: item.title || item.name || '',
        }))}
        onClick={(id) => navigate(`/${type}/${id}`)}
      />

      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};