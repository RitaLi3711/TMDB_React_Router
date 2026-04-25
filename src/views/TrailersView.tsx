import { MOVIE_ENDPOINT, TV_VIEW_ENDPOINT } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { useParams, useLocation } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const location = useLocation();
  
  const isMovie = location.pathname.includes('/movies/');
  const endpoint = isMovie ? MOVIE_ENDPOINT : TV_VIEW_ENDPOINT;
  
  const { data } = useTmdb<any>(
    `${endpoint}/${id}`,
    { append_to_response: 'videos' },
    [id, isMovie]
  );

  if (!data?.videos?.results) {
    return <p className="text-gray-400">Loading trailers...</p>;
  }

  const trailers = data.videos.results.filter(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  if (trailers.length === 0) {
    return <p className="text-gray-400">No trailers available</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trailers</h2>
      <div className="space-y-6">
        {trailers.map((trailer: any) => (
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