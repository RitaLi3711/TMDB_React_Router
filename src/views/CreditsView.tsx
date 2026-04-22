import { ImageGrid } from '@/components';
import { MOVIE_ENDPOINT } from '@/core/constants';
import type { CreditsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const CreditsView = () => {
  const { id } = useParams();

  const { data } = useTmdb<CreditsResponse>(
    `${MOVIE_ENDPOINT}/${id}/credits`,
    {},
    []
  );

  if (!data) {
    return <p className="text-center text-[#f0f4ef]">Loading...</p>;
  }

  const gridData = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  return (
    <section className="min-h-screen bg-[#0d1821] text-[#f0f4ef]">
      <h2 className="text-2xl font-bold mb-6 text-[#f0f4ef]">Credits</h2>

      {!data.cast.length && (
        <p className="text-[#bfcc94] text-center">No credits available.</p>
      )}

      <ImageGrid results={gridData} />
    </section>
  );
};