import { IMAGE_BASE_URL, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { FaBirthdayCake, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: person } = useTmdb<PersonResponse>(
    `https://api.themoviedb.org/3/person/${id}`,
    {},
    [id]
  );

  if (!person) {
    return (
      <div className="max-w-[1600px] mx-auto p-5">
        <p className="text-center text-gray-400">Loading person details...</p>
      </div>
    );
  }

  const profileUrl = person.profile_path ? `${IMAGE_BASE_URL}${person.profile_path}` : null;

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const department = person.known_for_department === 'Acting' ? '' : person.known_for_department;

  return (
    <div className="max-w-[1600px] mx-auto p-5">
      <button 
        onClick={() => navigate('/search')}
        className="mb-4 px-4 py-2 rounded-md transition-all duration-200 border bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]"
      >
        ← Back
      </button>

      <div className="flex gap-6 mb-6">
        {profileUrl && (
          <img 
            src={profileUrl} 
            alt={person.name}
            className="w-64 h-64 object-cover rounded-lg"
          />
        )}
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">{person.name}</h2>
          {department && (
            <p className="text-gray-300 mb-4">{department}</p>
          )}
          
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            {person.place_of_birth && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
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

          {person.deathday && (
            <p className="text-red-400 mt-2">Died: {new Date(person.deathday).toLocaleDateString()}</p>
          )}

          {person.biography && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white mb-2">Biography</h3>
              <p className="text-gray-300 leading-relaxed">{person.biography}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-700 mb-6">
        <Link 
          to={`/person/${id}/career`}
          className={`px-4 py-2 rounded-md transition-all duration-200 border ${
            isActive('career')
              ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
              : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]'
          }`}
        >
          Career
        </Link>
        <Link 
          to={`/person/${id}/images`}
          className={`px-4 py-2 rounded-md transition-all duration-200 border ${
            isActive('images')
              ? 'bg-[#e6aace] text-[#0d1821] border-[#e6aace] shadow-lg scale-105'
              : 'bg-[#344966] text-[#f0f4ef] border-[#344966] hover:bg-[#2a3b52] hover:text-[#f0f4ef] hover:border-[#bfcc94]'
          }`}
        >
          Images
        </Link>
      </div>

      {/* Career and Images will render here as separate pages, not nested */}
    </div>
  );
};