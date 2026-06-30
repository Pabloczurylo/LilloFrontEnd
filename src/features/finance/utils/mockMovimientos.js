/**
 * mockMovimientos.js
 * Datos simulados para el Libro Diario del Dashboard de Finanzas.
 */

export const mockMovimientos = [
  // ── MAÑANA ───────────────────────────────────────────────
  {
    id: 'mov-001',
    tipo: 'VENTAS',
    descripcion: 'Venta de Canasta Orgánica',
    detalle: 'Cliente: Elena R.',
    hora: '09:45 AM',
    turno: 'MAÑANA',
    monto: 8400,
    esIngreso: true,
    icono: '🛒',
  },
  {
    id: 'mov-002',
    tipo: 'PROVEEDORES',
    descripcion: 'Pago Proveedor: Granja Sol',
    detalle: 'Insumos: Lácteos',
    hora: '10:20 AM',
    turno: 'MAÑANA',
    monto: -12500,
    esIngreso: false,
    icono: '🚚',
  },

  // ── MEDIODÍA ─────────────────────────────────────────────
  {
    id: 'mov-003',
    tipo: 'VENTAS',
    descripcion: 'Venta Mostrador #042',
    detalle: 'Efectivo',
    hora: '12:15 PM',
    turno: 'MEDIODÍA',
    monto: 3250,
    esIngreso: true,
    icono: '🛒',
  },
  {
    id: 'mov-004',
    tipo: 'SERVICIOS',
    descripcion: 'Servicio Electricidad',
    detalle: 'Local Central',
    hora: '01:30 PM',
    turno: 'MEDIODÍA',
    monto: -2850,
    esIngreso: false,
    icono: '⚡',
  },
  {
    id: 'mov-005',
    tipo: 'OTROS',
    descripcion: 'Ajuste de Caja',
    detalle: 'Sobrante del día anterior',
    hora: '02:00 PM',
    turno: 'MEDIODÍA',
    monto: 1100,
    esIngreso: true,
    icono: '🧾',
  },

  // ── TARDE ─────────────────────────────────────────────────
  {
    id: 'mov-006',
    tipo: 'PÉRDIDA',
    descripcion: 'Merma: Fruta en mal estado',
    detalle: 'Inventario',
    hora: '02:45 PM',
    turno: 'TARDE',
    monto: -450,
    esIngreso: false,
    icono: '🗑️',
  },
];

/** Categorías de rendimiento semanal */
export const mockCategorias = [
  { id: 'cat-1', nombre: 'Verduras', icono: '🥬', monto: 18450, variacion: 12, color: 'green' },
  { id: 'cat-2', nombre: 'Frutas',   icono: '🍊', monto: 14200, variacion: 8,  color: 'orange' },
  { id: 'cat-3', nombre: 'Lácteos',  icono: '🧀', monto: 9800,  variacion: -3, color: 'blue' },
  { id: 'cat-4', nombre: 'Panadería',icono: '🍞', monto: 7600,  variacion: 5,  color: 'amber' },
];

/** Resumen del balance del día */
export const mockBalance = {
  total: 42850,
  ingresos: 58200,
  gastos: 15350,
  pendientes: 3,
  fecha: 'Hoy, 24 Mayo',
};
