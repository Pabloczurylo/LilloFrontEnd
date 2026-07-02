import { useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { BADGE_STYLES, CARD_BG_COLORS, fmtPrice } from '../utils/shopMockData';

/**
 * ShopProductCard – Tarjeta vertical para el catálogo de pedidos.
 *
 * Diseño fiel al mockup:
 *  - Área de imagen con fondo pastel + emoji grande centrado
 *  - Badge de tipo (Orgánico, Artesanal, etc.) en esquina sup-izq
 *  - Nombre del producto + proveedor
 *  - Precio a la derecha
 *  - Selector −/N/+ debajo
 *
 * Props:
 *  - product: objeto de shopMockData.shopProducts
 */
export default function ShopProductCard({ product }) {
  const { addItem, updateQty, getQty, removeItem } = useCart();
  const qty = getQty(product.id);

  const badge = BADGE_STYLES[product.badge];
  const cardBg = CARD_BG_COLORS[product.badge] ?? '#f5f5f0';

  const handleAdd = useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  const handleMinus = useCallback(() => {
    if (qty === 1) {
      removeItem(product.id);
    } else {
      updateQty(product.id, -1);
    }
  }, [qty, removeItem, updateQty, product.id]);

  const handlePlus = useCallback(() => {
    if (qty === 0) {
      addItem(product);
    } else {
      updateQty(product.id, 1);
    }
  }, [qty, addItem, updateQty, product]);

  return (
    <article
      id={`shop-card-${product.id}`}
      style={{ background: '#ffffff' }}
      className="rounded-2xl overflow-hidden shadow-sm border border-stone-100
                 transition-all duration-200 hover:shadow-md active:scale-[0.99]"
    >
      {/* ── Área imagen ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: cardBg, height: '160px' }}
      >
        {/* Badge tipo */}
        {badge && (
          <div
            className="absolute top-3 left-3 z-10 flex items-center gap-1.5
                       px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: badge.bg, color: badge.text }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: badge.dot }}
            />
            {badge.label}
          </div>
        )}

        {/* Imagen real o emoji fallback */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300
                       hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="select-none"
              style={{ fontSize: '64px', lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' }}
              role="img"
              aria-label={product.name}
            >
              {product.emoji}
            </span>
          </div>
        )}
      </div>


      {/* ── Info ── */}
      <div className="px-4 pt-3 pb-4">
        {/* Nombre + precio */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-extrabold text-stone-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-[11px] font-medium text-stone-400 mt-0.5 uppercase tracking-wide">
              {product.provider}
            </p>
          </div>
          <p
            className="text-[15px] font-extrabold shrink-0"
            style={{ color: '#1a5c1a' }}
          >
            {fmtPrice(product.price)}
          </p>
        </div>

        {/* Selector −/N/+ */}
        <div className="flex items-center gap-3 mt-3">
          <button
            id={`shop-minus-${product.id}`}
            type="button"
            onClick={handleMinus}
            disabled={qty === 0}
            aria-label={`Reducir cantidad de ${product.name}`}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       transition-all duration-150 cursor-pointer
                       disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: qty > 0 ? '#f0f0eb' : '#f5f5f0',
              color: '#4a4a4a',
            }}
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>

          <span
            className="text-base font-extrabold min-w-[24px] text-center"
            style={{ color: qty > 0 ? '#1a5c1a' : '#9ca3af' }}
          >
            {qty}
          </span>

          <button
            id={`shop-plus-${product.id}`}
            type="button"
            onClick={handlePlus}
            aria-label={`Agregar ${product.name} al pedido`}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       text-white transition-all duration-150 cursor-pointer
                       hover:opacity-90 active:scale-95"
            style={{ background: '#1a5c1a' }}
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
