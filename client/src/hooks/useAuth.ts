import { login, register } from "../services/authService";
import { IError } from "../interfaces/error.interface";
import { toast } from "react-toastify";
import { saveLs } from "../services/localStorageService";

export const useAuth = () => {
  const authenticate = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      saveLs(response.token);
      toast.success('Sesión iniciada');
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
