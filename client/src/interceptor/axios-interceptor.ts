import axios from 'axios';

const axiosInterceptor = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/67194425e41b4d34e447af30',
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': '$2a$10$2b3EYl/VI3aBcQ1SHLJfaOBb/xbbMzJtSdns8eib5BoiEe.Ch6bS6'
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
