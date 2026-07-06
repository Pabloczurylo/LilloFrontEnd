/**
 * shopUtils.js – Constantes de estilos y utilidades para la vista de shop.
 * Extraído de shopMockData.js para que ShopProductCard no dependa del mock.
 */

export const BADGE_STYLES = {
  organico:   { label: 'Orgánico',   bg: '#fff3e8', text: '#c46a1a', dot: '#f5a623' },
  artesanal:  { label: 'Artesanal',  bg: '#f0f4ff', text: '#3a5aad', dot: '#6b8ee8' },
  temporada:  { label: 'Temporada',  bg: '#edfaf0', text: '#1e7a3a', dot: '#34a853' },
  premium:    { label: 'Premium',    bg: '#fdf0f0', text: '#a83232', dot: '#d94f4f' },
  local:      { label: 'Local',      bg: '#f5f0ff', text: '#6b35b8', dot: '#9b6dde' },
};

export const CARD_BG_COLORS = {
  organico:  '#fef6ee',
  artesanal: '#f0f4ff',
  temporada: '#edfaf0',
  premium:   '#fdf0f0',
  local:     '#f5f0ff',
};

/** Formatea precio en ARS sin decimales */
export function fmtPrice(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}
