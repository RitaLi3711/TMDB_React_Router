import { MOVIE_ENDPOINT, TV_ENDPOINT, type TrailerResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const location = useLocation();
  const endpoint = location.pathname.includes('/movie/') ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<TrailerResponse>(`${endpoint}/${id}`, { append_to_response: 'videos' }, [id, endpoint]);
  const trailers = data?.videos?.results?.filter((video) => video.site === 'YouTube' && video.type === 'Trailer') || [];

  if (!data) return <p className="text-gray-400">Loading trailers...</p>;
  if (trailers.length === 0) return <p className="text-center text-gray-400">No trailers available.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trailers</h2>
      <div className="space-y-6">
        {trailers.map((trailer) => (
          <div key={trailer.key} className="space-y-2">
            <h3 className="text-lg font-semibold">{trailer.name}</h3>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};