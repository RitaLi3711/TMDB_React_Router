import { Modal } from '@/components';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 text-center">
        <p className="text-gray-400">Career - Person ID: {id}</p>
      </div>
    </Modal>
  );
};