import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTopOnLocationChange from '../utils/ScrollToTop';
import Layout from '../layout/Layout';
import { ROUTES } from '../constants/constants';
import Home from '../views/home/Home';
import Login from '../views/login/Login';
import Error404 from '../views/error/Error404';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <main id="main_BibliotecaYenny">
          <ScrollToTopOnLocationChange />
          <Routes>
            <Route path={ROUTES.HOME} index element={<Home />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
