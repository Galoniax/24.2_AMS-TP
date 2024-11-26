import { FcCancel } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Error403 = () => {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center">
      <FcCancel size={100} />
      <h1 className="text-3xl text-accent font-bold mt-4">Error 403</h1>
      <p className="text-xl text-accent font-bold mt-2">
        No tienes los permisos para ver esta página.
      </p>
      <Link
        to={ROUTES.HOME}
        className="text-sm flex gap-2 items-center mt-4 underline text-red-800"
      >
        <AiOutlineArrowLeft size={20} /> Ir a inicio
      </Link>
    </div>
  );
};

export default Error403;
