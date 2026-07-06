import { TrendingUp, TrendingDown } from 'lucide-react';

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);

/**
 * BalanceCard – Muestra el balance total del día con el monto principal
 * y los dos botones de acción: "Agregar Movimiento" y "Métricas Mensuales".
 */
export default function BalanceCard({ balance, onAgregarMovimiento, onMetricas }) {
  return (
    <section
      id="balance-card"
      className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100 flex flex-col gap-4"
    >
      {/* Label */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
        Balance Total del Día ({balance.fecha})
      </p>

      {/* Amount */}
      <p className={`text-4xl font-extrabold leading-none tracking-tight ${
        balance.neto >= 0 ? 'text-stone-900' : 'text-red-600'
      }`}>
        {fmt(balance.neto)}
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-2.5">
        <button
          id="agregar-movimiento-btn"
          onClick={onAgregarMovimiento}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-5
                     bg-green-900 hover:bg-green-800 active:bg-green-950
                     text-white font-semibold text-sm rounded-2xl
                     transition-colors shadow-sm cursor-pointer"
        >
          <span className="text-base leading-none">+</span>
          Agregar Movimiento
        </button>
      </div>

      {/* Ingresos / Gastos row */}
      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-stone-100">
        {/* Ingresos */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-green-700">
            <TrendingUp size={13} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Ingresos
            </span>
          </div>
          <p className="text-xl font-extrabold text-stone-900 leading-none">
            {fmt(balance.ingresos)}
          </p>
        </div>

        {/* Gastos */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-orange-600">
            <TrendingDown size={13} strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Gastos
            </span>
          </div>
          <p className="text-xl font-extrabold text-stone-900 leading-none">
            {fmt(balance.egresos)}
          </p>
        </div>
      </div>
    </section>
  );
}
