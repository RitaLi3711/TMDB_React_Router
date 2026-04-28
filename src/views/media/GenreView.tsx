import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useNavigate } from 'react-router-dom';

interface GenreItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

interface GenreResponse {
  results: GenreItem[];
  total_pages: number;
  page: number;
}

// Movie Genres
const movieGenres = [
  { label: 'Action', value: 28 },
  { label: 'Adventure', value: 12 },
  { label: 'Animation', value: 16 },
  { label: 'Crime', value: 80 },
  { label: 'Family', value: 10751 },
  { label: 'Fantasy', value: 14 },
  { label: 'History', value: 36 },
  { label: 'Horror', value: 27 },
  { label: 'Mystery', value: 9648 },
  { label: 'Sci-Fi', value: 878 },
];

// TV Genres
const tvGenres = [
  { label: 'Action', value: 10759 },
  { label: 'Animation', value: 16 },
  { label: 'Comedy', value: 35 },
  { label: 'Crime', value: 80 },
  { label: 'Documentary', value: 99 },
  { label: 'Drama', value: 18 },
  { label: 'Family', value: 10751 },
  { label: 'Kids', value: 10762 },
  { label: 'Mystery', value: 9648 },
  { label: 'Sci-Fi', value: 10765 },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [selectedGenre, setSelectedGenre] = useState<number>(28);
  const [page, setPage] = useState(1);

  const genres = mediaType === 'movie' ? movieGenres : tvGenres;
  const endpoint = `https://api.themoviedb.org/3/discover/${mediaType}`;

  const { data } = useTmdb<GenreResponse>(
    endpoint,
    { with_genres: selectedGenre, page },
    [mediaType, selectedGenre, page]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading genres...</p>;
  }

  const gridData: ImageCell[] = (data.results || []).map((item: GenreItem) => ({
    id: item.id,
    imageUrl: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '',
    primaryText: item.title || item.name || '',
    secondaryText: '',
  }));

  const handleClick = (id: number) => {
    navigate(`/${mediaType === 'movie' ? 'movies' : 'tv'}/${id}`);
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(parseInt(value));
    setPage(1);
  };

  const handleMediaTypeChange = (value: string) => {
    setMediaType(value as 'movie' | 'tv');
    setSelectedGenre(value === 'movie' ? 28 : 10759);
    setPage(1);
  };

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <div className="flex justify-between items-center">
        <ButtonGroup
          value={mediaType}
          onClick={handleMediaTypeChange}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV', value: 'tv' },
          ]}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.value}
            onClick={() => handleGenreChange(genre.value.toString())}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedGenre === genre.value
                ? 'bg-[#bfcc94] text-[#0d1821] font-semibold'  
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>

      <ImageGrid results={gridData} onClick={handleClick} />

      <Pagination
        page={page}
        maxPages={data.total_pages}
        onClick={setPage}
      />
    </section>
  );
};