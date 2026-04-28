import { Modal } from '@/components';
import { useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 text-center">
        <p className="text-gray-400">Person Details - ID: {id}</p>
      </div>
    </Modal>
  );
};