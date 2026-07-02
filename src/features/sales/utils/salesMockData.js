/**
 * salesMockData.js – Datos de ejemplo para el historial de ventas del día.
 * Simula ventas ya registradas al abrir la página.
 */

export const mockSalesHistory = [
  {
    id: 'V29041',
    customerName: 'Juan Pérez',
    items: [
      { name: 'Tomate Perita', quantity: 2, unit: 'KG', unitPrice: 1500 },
      { name: 'Zapallo', quantity: 1, unit: 'KG', unitPrice: 800 },
      { name: 'Huevos de Campo', quantity: 3, unit: 'DOZ', unitPrice: 4500 },
    ],
    total: 17900,
    status: 'completado',
    time: new Date(Date.now() - 1000 * 60 * 165).toISOString(), // ~2h 45min ago
  },
  {
    id: 'V29045',
    customerName: 'Mariana Sosa',
    items: [
      { name: 'Queso de Oveja Curado', quantity: 0.5, unit: 'KG', unitPrice: 12500 },
      { name: 'Pan de Masa Madre', quantity: 2, unit: 'UN', unitPrice: 3200 },
    ],
    total: 12650,
    status: 'completado',
    time: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // ~1h 30min ago
  },
  {
    id: 'V29048',
    customerName: 'Carlos Méndez',
    items: [
      { name: 'Palta Hass', quantity: 1.5, unit: 'KG', unitPrice: 6800 },
      { name: 'Naranjas para Jugo', quantity: 3, unit: 'KG', unitPrice: 2100 },
      { name: 'Miel Pura de Abeja', quantity: 1, unit: 'UN', unitPrice: 5200 },
    ],
    total: 21500,
    status: 'completado',
    time: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // ~45min ago
  },
];

/**
 * Genera un ID de venta único estilo V#####
 */
export function generateSaleId() {
  const num = 29050 + Math.floor(Math.random() * 1000);
  return `V${num}`;
}

/**
 * Formatea una fecha ISO a "HH:MM" local.
 */
export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formatea un número como moneda argentina.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
