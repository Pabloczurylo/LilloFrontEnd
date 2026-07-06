/**
 * promotionsUtils.js – Utilidades puras para el módulo de promociones.
 * Extraído del mock para que los componentes no dependan de datos falsos.
 */

/**
 * Calcula el precio final con descuento aplicado.
 * @param {number} originalPrice
 * @param {number} discountPct  (0–100)
 */
export function applyDiscount(originalPrice, discountPct) {
  return Math.round(originalPrice * (1 - discountPct / 100));
}

/**
 * Devuelve si una promo está dentro de su rango de vigencia.
 * Compatible con campos de la API: start_date / end_date (ISO string o Date)
 */
export function isWithinDateRange(promo) {
  const now   = new Date();
  const start = new Date(promo.start_date ?? promo.startDate);
  const end   = new Date(promo.end_date   ?? promo.endDate);
  end.setHours(23, 59, 59, 999);
  return now >= start && now <= end;
}

/** Categorías para el filtro de ofertas — se deriva dinámicamente de los datos de API */
export const OFFER_CATEGORIES = ['Todas', 'Frutas', 'Verduras', 'Lácteos', 'Panadería', 'Almacén'];
