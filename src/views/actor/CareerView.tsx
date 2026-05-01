import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: person } = useTmdb<PersonResponse>(
    `https://api.themoviedb.org/3/person/${id}`,
    { append_to_response: 'combined_credits' },
    [id]
  );

  if (!person?.combined_credits) return <p className="text-gray-400 mt-6 text-center">Loading...</p>;

  const mediaTypeMap = new Map();

  const credits = [
    ...(person.combined_credits.cast || []),
    ...(person.combined_credits.crew || []),
  ];

  const gridData = credits.map((item: any) => {
    mediaTypeMap.set(item.id, item.media_type);
    return {
      id: item.id,
      imageUrl: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '',
      primaryText: item.title || item.name || '',
      secondaryText: item.character || item.job || '',
    };
  });

  return (
    <ImageGrid 
      results={gridData} 
      onClick={(id) => {
        const mediaType = mediaTypeMap.get(id);
        navigate(`/${mediaType}/${id}`);
      }} 
    />
  );
};