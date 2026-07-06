/**
 * api.js — Cliente HTTP centralizado con Axios.
 *
 * - baseURL apunta a /api (el proxy de Vite lo redirige a http://localhost:3000 en dev)
 * - Interceptor de request: adjunta automáticamente el JWT del localStorage
 * - Interceptor de response: ante 401, limpia el token y redirige a /login
 */
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Interceptor de REQUEST ──────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lillo_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Interceptor de RESPONSE ─────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido → limpiar sesión y redirigir a login
      localStorage.removeItem('lillo_token');
      localStorage.removeItem('lillo_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
