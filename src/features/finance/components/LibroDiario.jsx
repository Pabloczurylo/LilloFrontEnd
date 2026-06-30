import { Calendar, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';
import MovimientoItem from './MovimientoItem';

const TURNOS_ORDER = ['MAÑANA', 'MEDIODÍA', 'TARDE', 'NOCHE'];

/**
 * LibroDiario – Sección del libro diario con movimientos agrupados por turno.
 */
export default function LibroDiario({ movimientos, fecha }) {
  /** Group movimientos by turno, preserving display order */
  const grouped = useMemo(() => {
    const map = {};
    movimientos.forEach((m) => {
      if (!map[m.turno]) map[m.turno] = [];
      map[m.turno].push(m);
    });
    return TURNOS_ORDER.filter((t) => map[t]).map((t) => ({
      turno: t,
      items: map[t],
    }));
  }, [movimientos]);

  return (
    <section id="libro-diario" className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-stone-600" strokeWidth={2} />
          <h2 className="text-sm font-bold text-stone-900">Libro Diario</h2>
        </div>

        {/* Date selector */}
        <button
          id="fecha-selector-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100
                     hover:bg-stone-200 rounded-xl text-[11px] font-semibold
                     text-stone-600 transition-colors cursor-pointer"
        >
          {fecha}
          <ChevronDown size={12} strokeWidth={2.5} />
        </button>
      </div>

      {/* Turno groups */}
      <div className="flex flex-col gap-5">
        {grouped.map(({ turno, items }) => (
          <div key={turno} className="flex flex-col gap-3">
            {/* Turno label */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 px-1">
              {turno}
            </p>
            {/* Items */}
            <div className="flex flex-col gap-2">
              {items.map((m) => (
                <MovimientoItem key={m.id} movimiento={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
