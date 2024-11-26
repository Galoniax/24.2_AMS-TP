import axiosInterceptor from '../interceptor/axios-interceptor';
import { IError } from '../interfaces/error.interface';
import LoggerService from './loggerService';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInterceptor.post(`/login`, { email, password });
    return response.data;
  } catch (err: any) {
    const error = err as IError;
    throw error.response.data.message;
  }
};

export const register = async (
  email: string,
  password: string,
  username: string,
  dni: string,
  birthDate: string,
) => {
  try {
    const response = await axiosInterceptor.post(`/register`, {
      email,
      password,
      username,
      dni,
      birthDate,
    });
    return response.data;
  } catch (err: any) {
    const error = err as IError;
    throw error.response.request;
  }
};
