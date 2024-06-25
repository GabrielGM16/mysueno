// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setupInterceptors = (navigate) => {
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      navigate('/error', { state: { error: errorMessage } });
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
