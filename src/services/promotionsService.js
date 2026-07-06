/**
 * promotionsService.js — Llamadas a la API de promociones.
 */
import api from './api';

/**
 * Obtiene todas las promociones.
 */
export async function getPromotionsAPI() {
  const { data } = await api.get('/promotions');
  return data;
}

/**
 * Crea una nueva promoción (solo admin).
 * @param {object} promoData
 */
export async function createPromotionAPI(promoData) {
  const { data } = await api.post('/promotions', promoData);
  return data;
}

/**
 * Actualiza una promoción (solo admin).
 * @param {string} id
 * @param {object} promoData
 */
export async function updatePromotionAPI(id, promoData) {
  const { data } = await api.put(`/promotions/${id}`, promoData);
  return data;
}

/**
 * Elimina una promoción (solo admin).
 * @param {string} id
 */
export async function deletePromotionAPI(id) {
  const { data } = await api.delete(`/promotions/${id}`);
  return data;
}
