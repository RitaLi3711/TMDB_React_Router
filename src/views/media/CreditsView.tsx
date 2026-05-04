import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, TV_ENDPOINT, type CreditsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes('/movie/');
  const { data } = useTmdb<CreditsResponse>(`${isMovie ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id}/credits`, {}, [id, isMovie]);

  if (!data) return <p className="text-center text-[#f0f4ef]">Loading credits...</p>;
  if (!data.cast.length) return <p className="text-center text-gray-400">No credits available.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#f0f4ef]">Credits</h2>
      <ImageGrid
        results={data.cast.map((person) => ({
          id: person.id,
          imageUrl: `${IMAGE_BASE_URL}${person.profile_path ?? ''}`,
          primaryText: person.name,
          secondaryText: person.character,
        }))}
        onClick={(personId) => navigate(`/person/${personId}`)}
      />
    </div>
  );
};
