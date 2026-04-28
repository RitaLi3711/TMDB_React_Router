import { ImageGrid } from '@/components';
import { MOVIE_ENDPOINT, TV_VIEW_ENDPOINT, IMAGE_BASE_URL, type CreditsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // Add useNavigate

export const CreditsView = () => {
  const navigate = useNavigate(); // Add this
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

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: result.profile_path ? `${IMAGE_BASE_URL}${result.profile_path}` : '',
    primaryText: result.name,
    secondaryText: result.character,
  }));

  const handleClick = (personId: number) => {
    navigate(`/person/${personId}`); // Changed to navigate
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#f0f4ef]">Credits</h2>

      {!data.cast.length && (
        <p className="text-[#bfcc94] text-center">No credits available.</p>
      )}

      <ImageGrid results={gridData} onClick={handleClick} />
    </div>
  );
};