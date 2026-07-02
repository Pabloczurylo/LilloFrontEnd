/**
 * shopMockData.js – Catálogo de productos de la verdulería para la vista de pedido.
 *
 * Cada producto tiene:
 *  - id, name, provider, description, price, unit, category
 *  - badge: { label, color } → tipo de producto (Orgánico, Artesanal, etc.)
 *  - emoji: ícono representativo
 *  - bgColor: color de fondo pastel para la tarjeta
 */

export const SHOP_CATEGORIES = [
  'Todos los productos',
  'Verduras',
  'Frutas',
  'Lácteos',
  'Panadería',
  'Huevos & Almacén',
  'Carnes & Aves',
];

export const BADGE_STYLES = {
  organico:   { label: 'Orgánico',   bg: '#fff3e8', text: '#c46a1a', dot: '#f5a623' },
  artesanal:  { label: 'Artesanal',  bg: '#f0f4ff', text: '#3a5aad', dot: '#6b8ee8' },
  temporada:  { label: 'Temporada',  bg: '#edfaf0', text: '#1e7a3a', dot: '#34a853' },
  premium:    { label: 'Premium',    bg: '#fdf0f0', text: '#a83232', dot: '#d94f4f' },
  local:      { label: 'Local',      bg: '#f5f0ff', text: '#6b35b8', dot: '#9b6dde' },
};

/** Colores de fondo suaves por badge para el área de imagen */
export const CARD_BG_COLORS = {
  organico:  '#fef6ee',
  artesanal: '#f0f4ff',
  temporada: '#edfaf0',
  premium:   '#fdf0f0',
  local:     '#f5f0ff',
};

export const shopProducts = [
  {
    id: 'sp-001',
    name: 'Zanahorias de Huerta',
    provider: 'Granja · 500g',
    price: 2450,
    unit: '500g',
    category: 'Verduras',
    badge: 'organico',
    emoji: '🥕',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80',
  },
  {
    id: 'sp-002',
    name: 'Tomate Reliquia',
    provider: 'Huerta Local · KG',
    price: 4500,
    unit: 'KG',
    category: 'Verduras',
    badge: 'organico',
    emoji: '🍅',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80',
  },
  {
    id: 'sp-003',
    name: 'Lechuga Francesa',
    provider: 'Huerta Local · UN',
    price: 1800,
    unit: 'UN',
    category: 'Verduras',
    badge: 'temporada',
    emoji: '🥬',
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=80',
  },
  {
    id: 'sp-004',
    name: 'Espinaca Baby',
    provider: 'Granja Orgánica · 300g',
    price: 2100,
    unit: '300g',
    category: 'Verduras',
    badge: 'organico',
    emoji: '🌿',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80',
  },
  {
    id: 'sp-005',
    name: 'Queso de Campo',
    provider: 'Cuña · 250g',
    price: 5100,
    unit: '250g',
    category: 'Lácteos',
    badge: 'artesanal',
    emoji: '🧀',
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&q=80',
  },
  {
    id: 'sp-006',
    name: 'Queso de Campo Curado',
    provider: 'Lácteos de Campo · 250g',
    price: 2900,
    unit: '250g',
    category: 'Lácteos',
    badge: 'artesanal',
    emoji: '🧀',
    imageUrl: 'https://images.unsplash.com/photo-1599720840323-bbbb5fc77a69?w=600&q=80',
  },
  {
    id: 'sp-007',
    name: 'Masa Madre Integral',
    provider: 'Panadería Provisión · UN',
    price: 3200,
    unit: 'UN',
    category: 'Panadería',
    badge: 'artesanal',
    emoji: '🍞',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  },
  {
    id: 'sp-008',
    name: 'Focaccia Romero',
    provider: 'Panadería Artesanal · UN',
    price: 2800,
    unit: 'UN',
    category: 'Panadería',
    badge: 'artesanal',
    emoji: '🫓',
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80',
  },
  {
    id: 'sp-009',
    name: 'Frutos del Bosque',
    provider: 'Mix · 300g',
    price: 3800,
    unit: '300g',
    category: 'Frutas',
    badge: 'temporada',
    emoji: '🫐',
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=80',
  },
  {
    id: 'sp-010',
    name: 'Naranjas para Jugo',
    provider: 'Ecuador · KG',
    price: 2100,
    unit: 'KG',
    category: 'Frutas',
    badge: 'temporada',
    emoji: '🍊',
    imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80',
  },
  {
    id: 'sp-011',
    name: 'Palta Hass',
    provider: 'Perú · KG',
    price: 6800,
    unit: 'KG',
    category: 'Frutas',
    badge: 'premium',
    emoji: '🥑',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80',
  },
  {
    id: 'sp-012',
    name: 'Huevos de Campo',
    provider: 'Granja · Docena',
    price: 4500,
    unit: 'DOZ',
    category: 'Huevos & Almacén',
    badge: 'organico',
    emoji: '🥚',
    imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&q=80',
  },
  {
    id: 'sp-013',
    name: 'Miel Pura de Abeja',
    provider: 'Sierra · 500g',
    price: 5200,
    unit: '500g',
    category: 'Huevos & Almacén',
    badge: 'artesanal',
    emoji: '🍯',
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80',
  },
  {
    id: 'sp-014',
    name: 'Pechuga de Campo',
    provider: 'Bandeja · 1KG',
    price: 7200,
    unit: '1KG',
    category: 'Carnes & Aves',
    badge: 'premium',
    emoji: '🍗',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80',
  },
  {
    id: 'sp-015',
    name: 'Cordero Patagónico',
    provider: 'Patagonia · KG',
    price: 12500,
    unit: 'KG',
    category: 'Carnes & Aves',
    badge: 'local',
    emoji: '🥩',
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
  },
];


/** Formatea precio en ARS sin decimales */
export function fmtPrice(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}
