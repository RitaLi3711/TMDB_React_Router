// views/media/GenreView.tsx
import { Button, ButtonGroup, ImageGrid, Pagination } from '@/components';
import { useTmdb } from '@/hooks';
import { useState, useEffect } from 'react';
import { IMAGE_BASE_URL, type ImageCell } from '@/core';
import { useNavigate, useParams } from 'react-router-dom';

type GenreItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

type GenreResponse = {
  results: GenreItem[];
  total_pages: number;
  page: number;
}

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
  const { mediaType: urlMediaType, genreSlug } = useParams();
  
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>(() => {
    if (urlMediaType === 'tv' || urlMediaType === 'movie') return urlMediaType;
    return 'movie';
  });
  
  const genres = mediaType === 'movie' ? movieGenres : tvGenres;
  
  const [selectedGenre, setSelectedGenre] = useState<number>(() => {
    if (genreSlug) {
      const found = genres.find(g => g.slug === genreSlug);
      if (found) return found.value;
    }
    return genres[0].value;
  });
  
  const [page, setPage] = useState(1);

  useEffect(() => {
    const currentGenre = genres.find(g => g.value === selectedGenre);
    if (currentGenre && currentGenre.slug !== genreSlug) {
      navigate(`/genre/${mediaType}/${currentGenre.slug}`, { replace: true });
    }
  }, [mediaType, selectedGenre]);

  useEffect(() => {
    if (urlMediaType === 'movie' || urlMediaType === 'tv') {
      setMediaType(urlMediaType);
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

  const gridData: ImageCell[] = (data.results || []).map((item) => ({
    id: item.id,
    imageUrl: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '',
    primaryText: item.title || item.name || '',
    secondaryText: '',
  }));

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <ButtonGroup
        value={mediaType}
        onClick={(value) => {
          const newMediaType = value as 'movie' | 'tv';
          const newGenres = newMediaType === 'movie' ? movieGenres : tvGenres;
          const defaultGenre = newGenres[0];
          navigate(`/genre/${newMediaType}/${defaultGenre.slug}`);
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
            onClick={() => navigate(`/genre/${mediaType}/${genre.slug}`)}
          >
            {genre.label}
          </Button>
        ))}
      </div>

      <ImageGrid 
        results={gridData} 
        onClick={(id) => navigate(`/${mediaType === 'movie' ? 'movie' : 'tv'}/${id}`)} 
      />
      
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};