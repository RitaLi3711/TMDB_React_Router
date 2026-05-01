import { Button } from '@/components';
import { IMAGE_BASE_URL, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import { FaBirthdayCake, FaLocationArrow } from 'react-icons/fa';

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: person } = useTmdb<PersonResponse>(
    `https://api.themoviedb.org/3/person/${id}`,
    {},
    [id]
  );

  if (!person) return <p className="text-center text-gray-400 p-5">Loading...</p>;

  const profileUrl = person.profile_path ? `${IMAGE_BASE_URL}${person.profile_path}` : null;
  const isActive = (path: string) => location.pathname.includes(path);
  const department = person.known_for_department === 'Acting' ? '' : person.known_for_department;

  return (
    <div className="max-w-[1600px] mx-auto p-5">
      <div className="flex gap-8 mb-6">
        {profileUrl && (
          <img 
            src={profileUrl} 
            alt={person.name} 
            className="w-64 aspect-[2/3] object-cover rounded-lg" 
          />
        )}
        
        <div className="flex-1">
          <div className="mb-2">
            <Button onClick={() => navigate(-1)}>← Back</Button>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{person.name}</h2>
          {department && <p className="text-gray-300 mb-4">{department}</p>}
          
          <div className="flex flex-col gap-2 text-sm text-gray-400 mb-4">
            {person.place_of_birth && (
              <div className="flex items-center gap-2">
                <FaLocationArrow />
                <span>{person.place_of_birth}</span>
              </div>
            )}
            {person.birthday && (
              <div className="flex items-center gap-2">
                <FaBirthdayCake />
                <span>Born: {new Date(person.birthday).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {person.deathday && <p className="text-red-400 mb-4">Died: {new Date(person.deathday).toLocaleDateString()}</p>}

          <div>
            {person.biography ? (
              <p className="text-gray-300 leading-relaxed">{person.biography}</p>
            ) : (
              <p className="text-gray-400 italic">No biography available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-700 mb-6">
        <Link 
          to={`/person/${id}/career`} 
          replace={true} 
          className={`px-4 py-2 rounded-md transition-all duration-200 border ${
            isActive('career')
              ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
              : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52]'
          }`}
        >
          Career
        </Link>
        <Link 
          to={`/person/${id}/images`} 
          replace={true} 
          className={`px-4 py-2 rounded-md transition-all duration-200 border ${
            isActive('images')
              ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
              : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52]'
          }`}
        >
          Images
        </Link>
      </div>

      <Outlet />
    </div>
  );
};