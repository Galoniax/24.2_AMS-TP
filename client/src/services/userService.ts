import axiosInterceptor from "../interceptor/axios-interceptor";
import { IUser } from "../interfaces/user.interface";

export const fetchAllUsers = async (): Promise<IUser[]> => {
  const response = await axiosInterceptor.get('/users');
  return response.data;
};
