// frontend/src/api/axiosConfig.js
import axios from 'axios';

// Creamos una instancia de axios
const api = axios.create({
  // Usará la URL de Render en producción, o localhost si la variable no está definida
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Usamos un interceptor para añadir el token a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;