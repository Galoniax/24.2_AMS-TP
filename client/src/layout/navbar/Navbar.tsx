import { Link, useLocation } from 'react-router-dom';
import './navbar.scss';
import logo from '../../assets/images/logo.png';
import { NAVBAR_ROUTES } from '../../constants/navbar-routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { RolesEnum } from '../../constants/enum/RolesEnum';
import {  FaBell, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { logout } from '../../store/actions/logout';
import { AnimatePresence, motion } from 'framer-motion';
import { toggleSidebar } from '../../store/actions/sidebar';
import { FaCartFlatbed } from 'react-icons/fa6';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const currentUser = useSelector((state: RootState) => state.auth);
  const isAuthenticated = currentUser?.isAuthenticated;
  const userRole = currentUser?.user_data?.role;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cartItemCount = useSelector((state: RootState) => state.cart.cartItems.length);

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
        <div className='flex items-center gap-10'>
          <ul className="flex gap-10">
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
                const isActive = location.pathname === route.path;

                return (
                  <motion.li
                    key={route.name}
                    className="text-sm cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                  >
                    <Link
                      key={route.name}
                      to={route.path}
                      className={`text-white text-base cursor-pointer ${isActive ? "font-bold underline" : ""}`}
                    >
                      {route.name}
                    </Link>
                  </motion.li>
                );
              })}
          </ul>
        </div>
        <div className='flex items-center gap-4'>
        <div className="relative">
          <button onClick={() => dispatch(toggleSidebar())} className="p-2">
            <FaCartFlatbed className="text-2xl text-white" />
          </button>
          {cartItemCount > 0 && (
            <span className="absolute top-[-5px] right-[-5px] bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          </div>
          <div className="relative">
            {isAuthenticated && (
              <>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                  onClick={() => toggleMenu()}
                  className="text-white text-lg focus:outline-none border-white border-2 rounded-full p-2"
                >
                  <FaUser />
                </motion.button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 overflow-hidden"
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
