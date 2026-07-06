import { useCallback } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { fmtPrice, BADGE_STYLES, CARD_BG_COLORS } from '../../shop/utils/shopUtils';

/**
 * CartItem – Fila de ítem en la vista de resumen del pedido.
 *
 * Diseño fiel al mockup:
 *  - Thumbnail cuadrado con fondo pastel + emoji
 *  - Badge del proveedor en naranja/verde pequeño
 *  - Nombre del producto en bold
 *  - Selector −/N/+ inline (botón + verde relleno)
 *  - Precio unitario inline + precio total a la derecha
 *  - Ícono de papelera para eliminar
 *
 * Props:
 *  - item: { product, quantity }
 */
export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();
  const { product, quantity } = item;

  const badge = BADGE_STYLES[product.badge];
  const thumbBg = CARD_BG_COLORS[product.badge] ?? '#f5f5f0';
  const lineTotal = product.price * quantity;

  const handleMinus = useCallback(() => {
    if (quantity === 1) {
      removeItem(product.id);
    } else {
      updateQty(product.id, -1);
    }
  }, [quantity, removeItem, updateQty, product.id]);

  const handlePlus = useCallback(() => {
    updateQty(product.id, 1);
  }, [updateQty, product.id]);

  return (
    <article
      id={`cart-item-${product.id}`}
      className="flex items-center gap-3 p-4 rounded-2xl border border-stone-100 bg-white
                 shadow-sm transition-all"
    >
      {/* ── Thumbnail ── */}
      <div
        className="w-16 h-16 shrink-0 rounded-xl flex items-center justify-center"
        style={{ background: thumbBg }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '32px', lineHeight: 1 }}>{product.emoji}</span>
      </div>

      {/* ── Info ── */}
      <div className="flex-1 min-w-0">
        {/* Proveedor badge */}
        {badge && (
          <p
            className="text-[9px] font-extrabold uppercase tracking-widest mb-0.5"
            style={{ color: badge.text }}
          >
            {product.provider}
          </p>
        )}

        {/* Nombre */}
        <p className="text-[14px] font-extrabold text-stone-900 leading-tight">
          {product.name}
        </p>

        {/* Selector + precio unitario */}
        <div className="flex items-center gap-2 mt-2">
          {/* Botón − */}
          <button
            id={`cart-minus-${product.id}`}
            type="button"
            onClick={handleMinus}
            aria-label="Reducir cantidad"
            className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer
                       transition-all hover:opacity-80 active:scale-90"
            style={{ background: '#f0f0eb', color: '#4a4a4a' }}
          >
            <Minus size={12} strokeWidth={2.5} />
          </button>

          {/* Cantidad */}
          <span
            className="text-sm font-extrabold min-w-[20px] text-center"
            style={{ color: '#1a5c1a' }}
          >
            {quantity}
          </span>

          {/* Botón + */}
          <button
            id={`cart-plus-${product.id}`}
            type="button"
            onClick={handlePlus}
            aria-label="Aumentar cantidad"
            className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer
                       text-white transition-all hover:opacity-90 active:scale-90"
            style={{ background: '#1a5c1a' }}
          >
            <Plus size={12} strokeWidth={2.5} />
          </button>

          {/* Precio unitario */}
          <span
            className="text-[12px] font-semibold ml-1 px-2 py-0.5 rounded-lg"
            style={{ background: '#f5f5f0', color: '#6b6b6b' }}
          >
            {fmtPrice(product.price)}
          </span>
        </div>
      </div>

      {/* ── Precio total + eliminar ── */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <p className="text-[15px] font-extrabold" style={{ color: '#1a1a1a' }}>
          {fmtPrice(lineTotal)}
        </p>
        <button
          id={`cart-remove-${product.id}`}
          type="button"
          onClick={() => removeItem(product.id)}
          aria-label={`Eliminar ${product.name} del pedido`}
          className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer
                     transition-all hover:opacity-80 active:scale-90"
          style={{ color: '#c0392b', background: '#fdf0ef' }}
        >
          <Trash2 size={13} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}
