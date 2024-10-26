import axios from 'axios';
import store from '../store';
import { SET_LOADING } from '../store/types';
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
    store.dispatch({ type: SET_LOADING, payload: true });
    const token = getFromLs();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch({ type: SET_LOADING, payload: false });
    return Promise.reject(error);
  }
);

axiosInterceptor.interceptors.response.use(
  (response) => {
    store.dispatch({ type: SET_LOADING, payload: false });
    return response;
  },
  (error) => {
    store.dispatch({ type: SET_LOADING, payload: false });
    console.error('Error en la respuesta', error);
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
