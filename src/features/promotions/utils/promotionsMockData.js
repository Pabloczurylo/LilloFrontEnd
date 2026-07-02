/**
 * promotionsMockData.js – Datos de ejemplo para el módulo de Promociones.
 * Se usan como seed inicial del PromotionsContext.
 */
import { mockProducts } from '../../../utils/mockData';

/** Genera un ID único para cada promo */
let _nextId = 100;
export const nextPromoId = () => String(++_nextId);

/**
 * Crea las fechas de vigencia relativas a hoy para que los ejemplos
 * siempre estén dentro del rango activo.
 */
const today = new Date();
const addDays = (d, n) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r.toISOString().split('T')[0];
};

/** Lookup rápido de producto por id */
const p = (id) => mockProducts.find((x) => x.id === id);

export const mockPromotions = [
  {
    id: 'promo-001',
    product: p(1),          // Tomate Perita – 1500 ARS
    discount: 40,
    origin: 'Granja Local',
    startDate: addDays(today, -2),
    endDate: addDays(today, 5),
    active: true,
  },
  {
    id: 'promo-002',
    product: p(7),          // Naranjas para Jugo – 2100 ARS
    discount: 25,
    origin: 'Ecuador',
    startDate: addDays(today, -1),
    endDate: addDays(today, 7),
    active: true,
  },
  {
    id: 'promo-003',
    product: p(3),          // Huevos de Campo – 4500 ARS
    discount: 50,
    origin: 'Orgánicos',
    startDate: addDays(today, 0),
    endDate: addDays(today, 3),
    active: true,
  },
  {
    id: 'promo-004',
    product: p(4),          // Palta Hass – 6800 ARS
    discount: 20,
    origin: 'Perú',
    startDate: addDays(today, -3),
    endDate: addDays(today, 4),
    active: false,          // pausada para demo del toggle
  },
];

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
 */
export function isWithinDateRange(promo) {
  const now = new Date();
  const start = new Date(promo.startDate);
  const end = new Date(promo.endDate);
  // end of day for endDate
  end.setHours(23, 59, 59, 999);
  return now >= start && now <= end;
}

/** Categorías únicas del catálogo, ordenadas */
export const OFFER_CATEGORIES = ['Todas', 'Frutas', 'Verduras', 'Lácteos', 'Panadería', 'Almacén'];
