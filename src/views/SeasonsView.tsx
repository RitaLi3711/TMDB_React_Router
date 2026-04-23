import { LinkGroup, Modal } from '@/components';
import { IMAGE_BASE_URL, SEASONS_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from '@/core/constants';
import type { SeasonsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${SEASONS_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);

  const trailerVideo =
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official')) ||
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

    
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 space-y-6">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={data.name} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {data.air_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            {trailerVideo && (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title="Season Trailer"
                  allowFullScreen
                />
              </div>
            )}
            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};