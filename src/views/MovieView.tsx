import { LinkGroup } from '@/components';
import {
  IMAGE_BASE_URL,
  MOVIE_ENDPOINT,
  ORIGINAL_IMAGE_BASE_URL,
} from '@/core/constants';
import type { DetailRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

export const MovieView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // where we should return when closing modal
  const backgroundLocation = (location.state as any)?.backgroundLocation;

  const { data } = useTmdb<DetailRepsonse>(
    `${MOVIE_ENDPOINT}/${id}`,
    { append_to_response: 'videos' },
    []
  );

  if (!data) {
    return <p className="text-center text-[#f0f4ef]">Loading...</p>;
  }

  const closeModal = () => {
    // return to original page if opened as modal
    if (backgroundLocation) {
      navigate(backgroundLocation.pathname);
    } else {
      // fallback if user opened page directly
      navigate('/movies/category/now_playing');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#0d1821]/50 backdrop-blur-md z-50 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="max-w-5xl mx-auto my-10 bg-[#0d1821] rounded-2xl shadow-2xl p-8 relative outline outline-4 outline-[#e6aace]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BACKDROP IMAGE */}
        <div
          className="h-[300px] bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />

        {/* MAIN CONTENT */}
        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <img
            className="w-[250px] h-[375px] object-cover rounded-xl shadow-lg"
            src={`${IMAGE_BASE_URL}${data.poster_path}`}
            alt={data.title}
          />

          <div className="space-y-4 flex-1">
            <h1 className="text-4xl font-bold text-[#f0f4ef]">{data.title}</h1>
            <p className="text-[#bfcc94]">{data.release_date}</p>
            <p className="text-[#f0f4ef] leading-relaxed">{data.overview}</p>

            {/* TABS */}
            <LinkGroup
              options={[
                {
                  label: 'Credits',
                  to: `/movies/${id}/credits`,
                },
                {
                  label: 'Reviews',
                  to: `/movies/${id}/reviews`,
                },
              ]}
            />
          </div>
        </div>

        {/* CHILD ROUTES */}
        <section className="mt-8">
          <Outlet />
        </section>
      </div>
    </div>
  );
};