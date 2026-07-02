import { CheckCircle2 } from 'lucide-react';

/**
 * SalesSummaryBar – Barra de resumen de cuenta con total y botón "Registrar Venta".
 *
 * Mobile  : posición fija en el bottom (encima del BottomNav).
 * Desktop : sección estática dentro del layout de la página.
 *
 * Props:
 *  - total       : number
 *  - itemCount   : number
 *  - onConfirm   : () => void
 *  - disabled    : boolean
 */
export default function SalesSummaryBar({ total, itemCount, onConfirm, disabled }) {
  return (
    <>
      {/* ── Mobile: fixed bar above BottomNav ── */}
      <div
        className="lg:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))]
                   inset-x-0 z-30 px-5 pb-2"
      >
        <div className="bg-white rounded-2xl border border-stone-100 shadow-lg px-5 py-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Resumen de Cuenta
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-stone-900">
                  ${total.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                  Total
                </span>
                <span className="text-[10px] text-stone-300 italic">
                  Impuestos incluidos
                </span>
              </div>
            </div>
            {itemCount > 0 && (
              <span className="text-[10px] font-bold text-green-800 bg-green-50
                               px-2 py-1 rounded-full border border-green-200">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
              </span>
            )}
          </div>

          <button
            id="register-sale-btn-mobile"
            type="button"
            onClick={onConfirm}
            disabled={disabled}
            className={`flex items-center justify-center gap-2.5 w-full py-3.5 px-5
                        font-bold text-base rounded-2xl transition-all cursor-pointer
                        ${disabled
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : 'bg-green-900 hover:bg-green-800 active:scale-[.98] text-white shadow-md'
                        }`}
          >
            <CheckCircle2 size={18} />
            Registrar Venta
          </button>
        </div>
      </div>

      {/* ── Desktop: inline summary card ── */}
      <div className="hidden lg:block mt-5 bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Resumen de Cuenta
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-stone-900">
                ${total.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                Total
              </span>
              <span className="text-xs text-stone-300 italic">
                Impuestos incluidos
              </span>
            </div>
          </div>
          {itemCount > 0 && (
            <span className="text-[11px] font-bold text-green-800 bg-green-50
                             px-2.5 py-1 rounded-full border border-green-200">
              {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
            </span>
          )}
        </div>

        <button
          id="register-sale-btn-desktop"
          type="button"
          onClick={onConfirm}
          disabled={disabled}
          className={`flex items-center justify-center gap-2.5 w-full py-4 px-5
                      font-bold text-base rounded-2xl transition-all cursor-pointer
                      ${disabled
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-green-900 hover:bg-green-800 active:scale-[.98] text-white shadow-md'
                      }`}
        >
          <CheckCircle2 size={18} />
          Registrar Venta
        </button>
      </div>
    </>
  );
}
