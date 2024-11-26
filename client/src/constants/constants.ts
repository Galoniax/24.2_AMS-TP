export type Nullable<T> = T | undefined | null;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SEARCH: '/search',
  BOOKS: '/books',
  BOOK: '/books/:id',
  CATALOG: '/catalog',
  ERROR_403: '/error-403',
  ADMIN_DASHBOARD: '/admin-dashboard',
};
