import { INavbarRoute } from '../interfaces/navbar.routes.interface';
import { ROUTES } from './constants';

export const NAVBAR_ROUTES: INavbarRoute[] = [

  
  {
    name: 'Home',
    path: ROUTES.HOME,
  },
  {
    name: 'Libros',
    path: ROUTES.BOOKS,
  },
  {
    name: 'Catálogo',
    path: ROUTES.CATALOG,
  },
  {
    name: 'Iniciar sesión',
    path: ROUTES.LOGIN,
  },
  {
    name: 'Registrarse',
    path: ROUTES.REGISTER,
  },
  
  // {
  //   name: 'Profile',
  //   path: ROUTES.PROFILE
  // }
];
