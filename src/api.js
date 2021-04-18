import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:9999/api'
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('AUTH_TOKEN');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default API;
