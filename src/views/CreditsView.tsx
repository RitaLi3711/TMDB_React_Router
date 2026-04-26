import { ImageGrid } from '@/components';
import { MOVIE_ENDPOINT, TV_VIEW_ENDPOINT } from '@/core/constants';
import type { CreditsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams, useLocation } from 'react-router-dom';

export const CreditsView = () => {
  const { id } = useParams();
  const location = useLocation();
  
  const isMovie = location.pathname.includes('/movies/');
  const endpoint = isMovie ? MOVIE_ENDPOINT : TV_VIEW_ENDPOINT;
  
  const { data } = useTmdb<CreditsResponse>(
    `${endpoint}/${id}/credits`,
    {},
    [id, isMovie]
  );

  if (!data) {
    return <p className="text-center text-[#f0f4ef]">Loading credits...</p>;
  }

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#f0f4ef]">Credits</h2>

      {!data.cast.length && (
        <p className="text-[#bfcc94] text-center">No credits available.</p>
      )}

      <ImageGrid results={gridData} getHref={(id) => `/person/${id}`} />
    </div>
  );
};