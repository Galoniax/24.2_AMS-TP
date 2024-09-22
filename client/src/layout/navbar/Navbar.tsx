import { Link } from 'react-router-dom';

import './navbar.scss';
import logo from '../../assets/images/logo.png';
import { NAVBAR_ROUTES } from '../../constants/navbar-routes';

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
            {NAVBAR_ROUTES.map((route) => (
              <Link
                key={route.name}
                to={route.path}
                className="text-white text-sm cursor-pointer"
              >
                {route.name}
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
