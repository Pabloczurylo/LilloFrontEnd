import { useState } from 'react';
import { Printer, ListOrdered, ChevronDown, ChevronUp, ClipboardList, CheckCircle2 } from 'lucide-react';
import SaleStatusBadge from './SaleStatusBadge';
import { formatTime } from '../utils/salesMockData';

/** Cicla entre estados al hacer click en "Modificar estado" */
const STATUS_CYCLE = ['completado', 'pendiente', 'cancelado'];

/**
 * Construye la línea resumen de ítems de una venta.
 * Ej: "2kg Tomate, 1 UN Pan, 0.5kg Queso"
 */
function buildItemsSummary(items) {
  return items
    .map((it) => {
      const qty = Number.isInteger(it.quantity)
        ? `${it.quantity}`
        : `${it.quantity.toFixed(1).replace('.0', '')}`;
      const unit = it.unit.toLowerCase() === 'kg' ? 'kg' : it.unit;
      return `${qty}${unit} ${it.name}`;
    })
    .join(', ');
}

/**
 * SaleCard – Tarjeta de una venta en el historial.
 */
function SaleCard({ sale, onStatusChange }) {
  const [expanded, setExpanded] = useState(false);
  const statusIdx = STATUS_CYCLE.indexOf(sale.status);

  const handleCycleStatus = () => {
    const next = STATUS_CYCLE[(statusIdx + 1) % STATUS_CYCLE.length];
    onStatusChange(sale.id, next);
  };

  const handlePrint = () => {
    // Placeholder – en producción conectaría con el servicio de impresión
    alert(`🖨️ Emitiendo comprobante para venta #${sale.id}...`);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-stone-100 shadow-sm
                 overflow-hidden transition-all"
    >
      {/* ── Header de la tarjeta ── */}
      <div className="px-4 pt-4 pb-3">
        {/* Nombre + Badge */}
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm font-extrabold text-stone-800">
            {sale.customerName}
          </span>
          <SaleStatusBadge status={sale.status} />
        </div>

        {/* Resumen de ítems */}
        <div className="flex items-start gap-1.5 mt-0.5">
          <span className="text-stone-400 text-sm shrink-0 mt-px">🛒</span>
          <p className="text-xs text-stone-500 leading-relaxed">
            {buildItemsSummary(sale.items)}
          </p>
        </div>

        {/* Ref + Hora */}
        <p className="text-[10px] text-stone-400 mt-1 font-medium">
          REF: #{sale.id} · {formatTime(sale.time)}
        </p>

        {/* Total */}
        <p className="text-xl font-extrabold text-stone-900 mt-2 text-right">
          ${sale.total.toLocaleString('es-AR')}
        </p>
      </div>

      {/* ── Detalle expandible ── */}
      {expanded && (
        <div className="px-4 pb-3 border-t border-stone-50 pt-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
            Detalle de Productos
          </p>
          <div className="flex flex-col gap-1">
            {sale.items.map((it, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-stone-600">
                  {it.quantity} {it.unit} × {it.name}
                </span>
                <span className="font-semibold text-stone-700">
                  ${(it.quantity * it.unitPrice).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs mt-1 pt-1
                            border-t border-stone-100 font-bold">
              <span className="text-stone-500">Total</span>
              <span className="text-green-900">${sale.total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Acciones ── */}
      <div className="flex flex-col gap-2 px-4 pb-4">
        {/* Toggle detalle */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center justify-center gap-1.5 py-0.5
                     text-[10px] font-semibold text-stone-400 hover:text-stone-600
                     transition-colors cursor-pointer"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? 'Ocultar detalle' : 'Ver detalle'}
        </button>

        {/* Modificar estado */}
        <button
          id={`modify-status-${sale.id}`}
          type="button"
          onClick={handleCycleStatus}
          className="flex items-center justify-center gap-2 w-full py-3 px-4
                     text-sm font-semibold text-stone-700
                     border border-stone-200 rounded-xl
                     hover:bg-stone-50 transition-colors cursor-pointer"
        >
          <ListOrdered size={16} className="text-stone-500" />
          Modificar estado del pedido
        </button>

        {/* Emitir comprobante */}
        <button
          id={`print-receipt-${sale.id}`}
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 w-full py-3 px-4
                     text-sm font-semibold text-white
                     bg-green-900 hover:bg-green-800 active:scale-[.98]
                     rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <Printer size={16} />
          Emitir Comprobante
        </button>
      </div>
    </div>
  );
}

/**
 * SalesHistory – Panel de historial de ventas del día.
 *
 * Props:
 *  - sales          : Sale[]
 *  - onStatusChange : (id, newStatus) => void
 */
export default function SalesHistory({ sales, onStatusChange }) {
  const [showAll, setShowAll] = useState(false);

  const sorted = [...sales].sort((a, b) => new Date(b.time) - new Date(a.time));
  const visible = showAll ? sorted : sorted.slice(0, 5);
  const hiddenCount = sorted.length - 5;

  return (
    <section aria-label="Historial de ventas del día">
      {/* Header de sección */}
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList size={15} className="text-green-800" />
        <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Registro de Ventas
        </p>
        {sales.length > 0 && (
          <span className="text-[10px] font-bold bg-green-100 text-green-800
                           px-1.5 py-0.5 rounded-full">
            {sales.length}
          </span>
        )}
      </div>

      {/* Empty state */}
      {sales.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3
                        py-12 bg-white rounded-2xl border border-dashed
                        border-stone-200 text-center">
          <CheckCircle2 size={32} className="text-stone-200" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-stone-400">Sin ventas registradas aún</p>
          <p className="text-xs text-stone-300 max-w-[200px] leading-relaxed">
            Las ventas confirmadas aparecerán aquí en tiempo real.
          </p>
        </div>
      )}

      {/* Lista de ventas */}
      <div className="flex flex-col gap-3">
        {visible.map((sale) => (
          <SaleCard
            key={sale.id}
            sale={sale}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      {/* Ver más / menos */}
      {sorted.length > 5 && (
        <button
          type="button"
          id="sales-history-show-more"
          onClick={() => setShowAll((v) => !v)}
          className="flex items-center justify-center gap-1.5 w-full mt-3 py-3
                     text-xs font-semibold text-stone-500 hover:text-stone-700
                     transition-colors cursor-pointer"
        >
          {showAll ? (
            <><ChevronUp size={13} /> Mostrar menos</>
          ) : (
            <><ChevronDown size={13} /> Ver {hiddenCount} ventas más</>
          )}
        </button>
      )}
    </section>
  );
}
