import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RolesEnum } from '../constants/enum/RolesEnum';
import { ROUTES } from '../constants/constants';

interface ProtectedRouteProps {
  roles: RolesEnum[]; 
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, element }) => {
  const { isAuthenticated, user_data } = useSelector((state: any) => state.auth);

  console.log("guard", isAuthenticated, user_data);
  console.log("ROLES", roles);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // Ya no es necesario hacer JSON.parse, ya que user_data es un objeto
  const user = user_data;

  console.log("ROL DEL USUARIO", user.role);

  // Si el rol del usuario no está en los roles permitidos, redirigir al error 403
  if (!user || !roles.includes(user.role)) {
    return <Navigate to={ROUTES.ERROR_403} />;
  }

  // Si todo está bien, renderizar el componente protegido
  return element;
};

export default ProtectedRoute;
