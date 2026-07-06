import { Trash2 } from 'lucide-react';
import PromoBadge from './PromoBadge';
import { applyDiscount } from '../utils/promotionsUtils';

/**
 * PromoListItem – Fila de la lista de promos en el panel admin.
 */
export default function PromoListItem({ promo, onToggle, onDelete }) {
  const { id, product, discount_percentage, start_date, end_date, is_active } = promo;
  if (!product) return null;

  const originalPrice = Number(product.price_per_unit);
  const discountVal = Number(discount_percentage);
  const finalPrice = applyDiscount(originalPrice, discountVal);

  const fmt = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n);

  const fmtDate = (iso) => {
    const d = new Date(iso);
    // Evitar desajustes horários sumando unas horas si es solo fecha
    if (iso && iso.length <= 10) {
      d.setHours(12, 0, 0, 0);
    }
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div
      id={`promo-item-${id}`}
      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border transition-all
                  ${is_active
                    ? 'bg-white border-stone-100 shadow-sm'
                    : 'bg-stone-50/60 border-stone-200 opacity-60'
                  }`}
    >
      {/* Thumbnail */}
      <div className="w-11 h-11 rounded-xl overflow-hidden bg-stone-100 shrink-0">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg">🛒</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-bold text-stone-800 truncate">{product.name}</p>
          <PromoBadge discount={discountVal} size="sm" />
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-xs text-stone-400 line-through">{fmt(originalPrice)}</p>
          <span className="text-stone-300 text-xs">→</span>
          <p className="text-xs font-bold text-green-700">{fmt(finalPrice)}</p>
        </div>
        <p className="text-[10px] text-stone-400 mt-0.5">
          {fmtDate(start_date)} – {fmtDate(end_date)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Toggle ON/OFF */}
        <button
          id={`toggle-promo-${id}`}
          type="button"
          onClick={() => onToggle(id, !is_active)}
          aria-label={is_active ? 'Pausar oferta' : 'Activar oferta'}
          className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0
                      ${is_active ? 'bg-green-600' : 'bg-stone-300'}`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
                        ${is_active ? 'translate-x-5' : 'translate-x-0.5'}`}
          />
        </button>

        {/* Eliminar */}
        <button
          id={`delete-promo-${id}`}
          type="button"
          onClick={() => onDelete(id)}
          aria-label="Eliminar oferta"
          className="w-8 h-8 flex items-center justify-center rounded-xl
                     bg-red-50 text-red-400 hover:bg-red-600 hover:text-white
                     transition-colors cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
