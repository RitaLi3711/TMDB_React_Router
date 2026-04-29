import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { useTmdb } from '@/hooks';
import { useState, useEffect } from 'react';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useNavigate, useParams } from 'react-router-dom';

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

// Movie Genres with slugs
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

// TV Genres with slugs
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
  const { mediaType: urlMediaType, genreSlug } = useParams<{ mediaType?: string, genreSlug?: string }>();
  
  // Get mediaType from URL or default to 'movie'
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>(urlMediaType === 'tv' ? 'tv' : 'movie');
  
  // Get genres based on mediaType
  const genres = mediaType === 'movie' ? movieGenres : tvGenres;
  
  // Find selected genre from URL slug or default to first genre
  const defaultGenre = genres[0];
  const initialGenre = genreSlug ? genres.find(g => g.slug === genreSlug)?.value || defaultGenre.value : defaultGenre.value;
  
  const [selectedGenre, setSelectedGenre] = useState<number>(initialGenre);
  const [page, setPage] = useState(1);

  // Update URL when mediaType or selectedGenre changes
  useEffect(() => {
    const currentGenre = genres.find(g => g.value === selectedGenre);
    if (currentGenre) {
      navigate(`/genre/${mediaType}/${currentGenre.slug}`, { replace: true });
    }
  }, [mediaType, selectedGenre, navigate]);

  // Sync state with URL params
  useEffect(() => {
    if (urlMediaType) {
      setMediaType(urlMediaType as 'movie' | 'tv');
    }
    if (genreSlug) {
      const currentGenres = urlMediaType === 'tv' ? tvGenres : movieGenres;
      const genre = currentGenres.find(g => g.slug === genreSlug);
      if (genre) {
        setSelectedGenre(genre.value);
        setPage(1);
      }
    }
  }, [urlMediaType, genreSlug]);

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
    const genreValue = parseInt(value);
    setSelectedGenre(genreValue);
    setPage(1);
    const genre = genres.find(g => g.value === genreValue);
    if (genre) {
      navigate(`/genre/${mediaType}/${genre.slug}`);
    }
  };

  const handleMediaTypeChange = (value: string) => {
    const newMediaType = value as 'movie' | 'tv';
    const newGenres = newMediaType === 'movie' ? movieGenres : tvGenres;
    const defaultGenre = newGenres[0];
    setMediaType(newMediaType);
    setSelectedGenre(defaultGenre.value);
    setPage(1);
    navigate(`/genre/${newMediaType}/${defaultGenre.slug}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
        onClick={handlePageChange}
      />
    </section>
  );
};