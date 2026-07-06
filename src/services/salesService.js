/**
 * salesService.js — API Service para el registro e historial de ventas.
 */
import api from './api';

/**
 * Obtiene el historial de ventas del backend.
 */
export async function getSalesAPI(params = {}) {
  const { data } = await api.get('/sales', { params });
  return data;
}

/**
 * Registra una venta en el backend.
 * @param {{ payment_method: string, items: Array<{ product_id: string, quantity: number }> }} saleData
 */
export async function createSaleAPI(saleData) {
  const { data } = await api.post('/sales', saleData);
  return data;
}

/**
 * Obtiene métricas de productos más vendidos.
 */
export async function getTopProductsAPI(params = {}) {
  const { data } = await api.get('/sales/metrics/top-products', { params });
  return data;
}
