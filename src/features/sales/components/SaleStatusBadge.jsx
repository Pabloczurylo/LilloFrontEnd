/**
 * SaleStatusBadge – Badge de estado de una venta.
 * Soporta: 'completado' | 'pendiente' | 'cancelado'
 */

const STATUS_CONFIG = {
  completado: {
    label: 'COMPLETADO',
    className: 'bg-green-100 text-green-800 border border-green-200',
  },
  pendiente: {
    label: 'PENDIENTE',
    className: 'bg-amber-100 text-amber-700 border border-amber-200',
  },
  cancelado: {
    label: 'CANCELADO',
    className: 'bg-red-100 text-red-700 border border-red-200',
  },
};

export default function SaleStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pendiente;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full
                  text-[10px] font-extrabold uppercase tracking-wider
                  ${config.className}`}
    >
      {config.label}
    </span>
  );
}
