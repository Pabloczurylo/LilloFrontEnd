/**
 * categoriesService.js — Llamadas a la API de categorías.
 */
import api from './api';

/**
 * Obtiene todas las categorías.
 */
export async function getCategoriesAPI() {
  const { data } = await api.get('/categories');
  return data;
}

/**
 * Crea una nueva categoría (solo admin).
 * @param {{ name: string, description?: string }} categoryData
 */
export async function createCategoryAPI(categoryData) {
  const { data } = await api.post('/categories', categoryData);
  return data;
}
