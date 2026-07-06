/**
 * productsService.js — Llamadas a la API de productos.
 */
import api from './api';

/**
 * Obtiene todos los productos activos.
 * @param {{ category_id?: string, include_inactive?: boolean }} params
 */
export async function getProductsAPI(params = {}) {
  const { data } = await api.get('/products', { params });
  return data;
}

/**
 * Obtiene un producto por ID.
 * @param {string} id
 */
export async function getProductByIdAPI(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

/**
 * Crea un nuevo producto (solo admin).
 * @param {object} productData
 */
export async function createProductAPI(productData) {
  const { data } = await api.post('/products', productData);
  return data;
}

/**
 * Actualiza un producto (solo admin).
 * @param {string} id
 * @param {object} productData
 */
export async function updateProductAPI(id, productData) {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
}

/**
 * Desactiva (soft delete) un producto (solo admin).
 * @param {string} id
 */
export async function deleteProductAPI(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}
