import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // console.log('[Interceptor] Running for:', config.url);
  // console.log('[Interceptor] Token from localStorage:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log('[Interceptor] Added header:', config.headers.Authorization);
  } else {
    console.log('[Interceptor] No token found');
  }
  return config;
});

export default api;