import { login, register } from "../services/authService";
import { IError } from "../interfaces/error.interface";
import { toast } from "react-toastify";
import { saveLs } from "../services/localStorageService";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "../store/types";

export const useAuth = () => {
  const dispatch = useDispatch();

  const authenticate = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      saveLs(response.token);
      toast.success('Sesión iniciada');

      const userData = {
        id: response.id,
        username: response.username,
        email: email,
        role: response.role.toUpperCase(),
        token: response.token,
      }

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });

    } catch (err: IError | any) {
      toast.error(err.message || 'Error en el servidor');
    }
  };

  const userRegister = async (email: string, password: string, username: string, dni: string, birthDate: string) => {
    try {
      const response = await register(email, password, username, dni, birthDate);
      console.log(response);
      toast.success('Registro exitoso, serás redirigido al login.');
    } catch (err: IError | any) {
      toast.error(err.message || 'Error en el servidor');
    }
  }

  return {
    authenticate,
    userRegister
  };
};
