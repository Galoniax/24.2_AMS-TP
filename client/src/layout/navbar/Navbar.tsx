import { Link } from 'react-router-dom';
import './navbar.scss';
import logo from '../../assets/images/logo.png';
import { NAVBAR_ROUTES } from '../../constants/navbar-routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { RolesEnum } from '../../constants/enum/RolesEnum';
import { FaBell, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { logout } from '../../store/actions/logout';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth);
  const isAuthenticated = currentUser?.isAuthenticated;
  const userRole = currentUser?.user_data?.role;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    logout()(dispatch);
  };

  return (
    <aside className="w-[100%]">
      <div className="w-[100%] px-4 py-2 bg-accent"></div>
      <nav className="w-[100%] px-8 py-2 bg-main flex justify-between items-center">
        <div>
          <img src={logo} alt="" className="w-[50px]" />
        </div>
        <div className='flex items-center gap-4'>
          <ul className="flex gap-4">
              {NAVBAR_ROUTES.map((route) => {
                if (route.hideOnAuth && isAuthenticated) {
                  return null;
                }

                if (route.requiredAuth && !isAuthenticated) {
                  return null;
                }

                if (route.role && (!userRole || !route.role.includes(userRole as RolesEnum))) {
                  return null;
                }

                return (
                  <Link
                    key={route.name}
                    to={route.path}
                    className="text-white text-sm cursor-pointer"
                  >
                    {route.name}
                  </Link>
                );
              })}
          </ul>
          {isAuthenticated && (
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => toggleMenu()}
                className="text-white text-lg focus:outline-none border-white border-2 rounded-full p-2"
              >
                <FaUser />
              </button>
              {showMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2"
                >
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaUser className="mr-2" />
                    Mi perfil
                  </Link>
                  <Link
                    to="/notifications"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaBell className="mr-2" />
                    Notificaciones
                  </Link>
                  <button
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                    className="w-full flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 text-left"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
