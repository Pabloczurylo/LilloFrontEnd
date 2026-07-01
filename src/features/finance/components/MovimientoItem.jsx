/**
 * MovimientoItem – Fila individual del Libro Diario.
 * Muestra icono, descripción, detalle, hora, badge de tipo y monto con color.
 */

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(Math.abs(n));

/** Badge color by tipo */
const badgeStyles = {
  VENTAS:       'bg-green-100 text-green-800',
  PROVEEDORES:  'bg-stone-100 text-stone-700',
  SERVICIOS:    'bg-blue-100 text-blue-700',
  OTROS:        'bg-amber-100 text-amber-700',
  'PÉRDIDA':    'bg-red-100 text-red-700',
};

export default function MovimientoItem({ movimiento }) {
  const { id, tipo, descripcion, detalle, hora, monto, esIngreso, icono } = movimiento;
  const badge = badgeStyles[tipo] ?? 'bg-gray-100 text-gray-700';

  return (
    <article
      id={`mov-${id}`}
      className="flex items-start gap-3 bg-white rounded-2xl p-4
                 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Icon bubble */}
      <div className="w-10 h-10 shrink-0 rounded-xl bg-stone-50 border border-stone-100
                      flex items-center justify-center text-lg">
        {icono}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-900 leading-tight truncate">
          {descripcion}
        </p>
        <p className="text-[11px] text-stone-400 mt-0.5">
          {detalle} · {hora}
        </p>
        {/* Badge */}
        <span
          className={`inline-block mt-1.5 text-[9px] font-bold uppercase tracking-wider
                      px-2 py-0.5 rounded-full ${badge}`}
        >
          {tipo}
        </span>
      </div>

      {/* Amount */}
      <div className="shrink-0 text-right pt-0.5">
        <p
          className={`text-base font-extrabold leading-tight ${
            esIngreso ? 'text-green-700' : 'text-red-500'
          }`}
        >
          {esIngreso ? '+' : '-'}{fmt(monto)}
        </p>
      </div>
    </article>
  );
}
