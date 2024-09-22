import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTopOnLocationChange from '../utils/ScrollToTop';
import Layout from '../layout/Layout';
import { ROUTES } from '../constants/constants';

import {
  Home,
  Books,
  Login,
  Register,
  Error404,
  Catalog,
  BookDetail,
} from '../views/';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <main id="main_BibliotecaYenny">
          <ScrollToTopOnLocationChange />
          <Routes>
            <Route path={ROUTES.HOME} index element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.BOOKS} element={<Books />} />
            <Route path={ROUTES.BOOK} element={<BookDetail />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.CATALOG} element={<Catalog />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
