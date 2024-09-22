import axios from 'axios';

const axiosInterceptor = axios.create({
  baseURL: 'http://localhost:8091',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la respuesta', error);
    return Promise.reject(error);
  },
);

export default axiosInterceptor;
