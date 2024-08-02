// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-3-235-102-184.compute-1.amazonaws.com/api',
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
