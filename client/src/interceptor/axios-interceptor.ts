import axios from 'axios';
import { getFromLs } from '../services/localStorageService';
import { appConfig } from '../config/ApplicationConfig';

const axiosInterceptor = axios.create({
  baseURL: appConfig.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = getFromLs();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la respuesta', error);
    return Promise.reject(error);
  },
);

export default axiosInterceptor;
