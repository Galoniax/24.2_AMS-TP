import { Link } from 'react-router-dom';

import './navbar.scss';
import logo from '../../assets/images/logo.png';
import { ROUTES } from '../../constants/constants';

const Navbar = () => {
  return (
    <aside className="w-[100%]">
      <div className="w-[100%] px-4 py-2 bg-accent"></div>
      <nav className="w-[100%] px-8 py-2 bg-main flex justify-between items-center">
        <div>
          <img src={logo} alt="" className="w-[50px]" />
        </div>
        <div>
          <ul className="flex gap-4">
            <Link
              to={ROUTES.HOME}
              className="text-white text-sm cursor-pointer"
            >
              Home
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="text-white text-sm cursor-pointer"
            >
              Iniciar Sesión
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="text-white text-sm cursor-pointer"
            >
              Registrarse
            </Link>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
