import { INavbarRoute } from '../interfaces/navbar.routes.interface';
import { ROUTES } from './constants';

export const NAVBAR_ROUTES: INavbarRoute[] = [
  {
    name: 'Home',
    path: ROUTES.HOME,
    requiredAuth: false
  },
  {
    name: 'Libros',
    path: ROUTES.BOOKS,
    requiredAuth: true
  },
  {
    name: 'Catálogo',
    path: ROUTES.CATALOG,
    requiredAuth: true
  },
  {
    name: 'Iniciar sesión',
    path: ROUTES.LOGIN,
    requiredAuth: false,
    hideOnAuth: true
  },
  {
    name: 'Registrarse',
    path: ROUTES.REGISTER,
    requiredAuth: false,
    hideOnAuth: true
  },
  // {
  //   name: 'Profile',
  //   path: ROUTES.PROFILE
  // }
];
