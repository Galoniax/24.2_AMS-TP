import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RolesEnum } from '../constants/enum/RolesEnum';
import { ROUTES } from '../constants/constants';
import { RootState } from '../store';

interface ProtectedRouteProps {
  roles: RolesEnum[]; 
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, element }) => {
  const { isAuthenticated, user_data } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  const user = user_data;

  if (!user || !user.role || !roles.includes(user.role)) {
    return <Navigate to={ROUTES.ERROR_403} />;
  }

  return element;
};

export default ProtectedRoute;
