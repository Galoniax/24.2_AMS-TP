import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const Breadcrumb = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="breadcrumb">
      <Button
        text="Volver"
        icon={<FaArrowLeft />}
        type="button"
        iconPosition="left"
        extraArgs={['flex items-center']}
        size="sm"
        onClick={goBack}
      />
    </div>
  );
};

export default Breadcrumb;
