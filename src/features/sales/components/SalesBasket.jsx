import { X, Plus, Utensils } from 'lucide-react';

/**
 * Devuelve el emoji de categoría según el nombre del producto (heurístico simple).
 */
function getProductIcon(name = '') {
  const n = name.toLowerCase();
  if (n.includes('tomat') || n.includes('papa') || n.includes('lechug') ||
      n.includes('ceboll') || n.includes('zanahori') || n.includes('zapall') ||
      n.includes('brocol') || n.includes('espinac')) return '🥬';
  if (n.includes('palta') || n.includes('manzana') || n.includes('naranj') ||
      n.includes('limón') || n.includes('limon') || n.includes('durazn') ||
      n.includes('uva') || n.includes('frutill') || n.includes('pera')) return '🍊';
  if (n.includes('pan') || n.includes('facturas') || n.includes('medialunas')) return '🍞';
  if (n.includes('queso') || n.includes('leche') || n.includes('yogur') ||
      n.includes('mantec')) return '🧀';
  if (n.includes('huev')) return '🥚';
  if (n.includes('miel')) return '🍯';
  if (n.includes('poll') || n.includes('carne') || n.includes('chinchulin') ||
      n.includes('roast') || n.includes('lomo') || n.includes('pechugas')) return '🥩';
  return '🛒';
}

/**
 * BasketItem – Tarjeta individual de un ítem en la canasta.
 */
function BasketItem({ item, onRemove }) {
  return (
    <div
      className="flex items-center gap-3.5 py-4
                 border-b border-stone-100 last:border-0 group"
    >
      {/* Icono */}
      <div className="w-11 h-11 rounded-2xl bg-stone-50 border border-stone-100
                      flex items-center justify-center text-xl shrink-0 select-none">
        {getProductIcon(item.name)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-stone-800 leading-tight truncate">
          {item.name}
        </p>
        <p className="text-xs text-stone-400 mt-0.5">
          {item.quantity} {item.unit.toLowerCase()} × ${item.unitPrice.toFixed(2)}
        </p>
      </div>

      {/* Total + borrar */}
      <div className="flex items-center gap-2 shrink-0">
        <p className="text-sm font-extrabold text-stone-800">
          ${item.total.toFixed(2)}
        </p>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Eliminar ${item.name}`}
          className="w-7 h-7 flex items-center justify-center rounded-xl
                     text-stone-300 hover:text-red-500 hover:bg-red-50
                     transition-all cursor-pointer
                     opacity-0 group-hover:opacity-100 lg:opacity-100"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/**
 * SalesBasket – Lista de productos en la venta actual.
 *
 * Props:
 *  - items      : BasketItem[]
 *  - onRemove   : (id) => void
 *  - onAddClick : () => void  – abre el modal para agregar producto
 */
export default function SalesBasket({ items, onRemove, onAddClick }) {
  return (
    <div className="mx-5 lg:mx-0">
      {/* Lista de ítems */}
      {items.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-4 mb-4">
          {items.map((item) => (
            <BasketItem key={item.id} item={item} onRemove={onRemove} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center gap-2.5
                        py-10 mb-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100
                          flex items-center justify-center">
            <Utensils size={24} className="text-stone-300" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-stone-400">La canasta está vacía</p>
          <p className="text-xs text-stone-300 text-center max-w-[180px] leading-relaxed">
            Agregá productos con el botón de abajo para armar la venta.
          </p>
        </div>
      )}

      {/* Botón Agregar Producto */}
      <button
        id="add-product-btn"
        type="button"
        onClick={onAddClick}
        className="flex items-center justify-center gap-2.5 w-full py-4
                   rounded-2xl border-2 border-dashed border-stone-300
                   text-sm font-semibold text-stone-500
                   hover:border-green-700 hover:text-green-800 hover:bg-green-50/50
                   transition-all cursor-pointer group"
      >
        <span className="w-6 h-6 rounded-full bg-green-900 flex items-center
                         justify-center group-hover:scale-110 transition-transform shrink-0">
          <Plus size={14} className="text-white" strokeWidth={2.5} />
        </span>
        + Agregar Producto
      </button>
    </div>
  );
}
