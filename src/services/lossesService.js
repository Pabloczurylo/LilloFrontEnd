/**
 * lossesService.js — Llamadas a la API de mermas (pérdidas de inventario).
 */
import api from './api';

/**
 * Obtiene el historial de mermas.
 */
export async function getLossesAPI(params = {}) {
  const { data } = await api.get('/inventory/losses', { params });
  return data;
}

/**
 * Registra una nueva merma.
 * @param {{ product_id: string, quantity: number, reason: string, notes?: string }} lossData
 */
export async function reportLossAPI(lossData) {
  const { data } = await api.post('/inventory/losses', lossData);
  return data;
}
