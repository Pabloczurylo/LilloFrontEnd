/**
 * authService.js — Llamadas a la API de autenticación.
 */
import api from './api';

/**
 * Inicia sesión con email y contraseña.
 * @param {string} mail
 * @param {string} password
 * @returns {{ token, user: { id, nombre, mail, rol } }}
 */
export async function loginAPI(mail, password) {
  const { data } = await api.post('/auth/login', { mail, password });
  return data;
}

/**
 * Obtiene el perfil del usuario autenticado usando el JWT guardado.
 * @returns {{ id, nombre, mail, rol }}
 */
export async function getMeAPI() {
  const { data } = await api.get('/auth/me');
  return data;
}
