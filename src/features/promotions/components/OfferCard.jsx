import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import PromoBadge from './PromoBadge';
import { applyDiscount } from '../utils/promotionsUtils';

/**
 * Emoji por categoría de producto (consistente con el resto del proyecto).
 */
function getCategoryEmoji(category = '') {
  const map = {
    Verduras: '🥬',
    Frutas: '🍊',
    Panadería: '🍞',
    Lácteos: '🧀',
    Almacén: '🏪',
  };
  return map[category] ?? '🛒';
}

/**
 * OfferCard – Tarjeta de oferta en la vista de cliente.
 *
 * Diseño (fiel al mockup):
 *  - Imagen grande con bg neutro + PromoBadge en esquina sup-der
 *  - Nombre del producto + origen (en gris pequeño)
 *  - Precio tachado + precio con descuento en verde
 *  - Botón "+" a la derecha
 *
 * Props:
 *  - promo       : Promotion object
 *  - onAdd       : (promo) => void  – agregar al carrito / venta
 */
export default function OfferCard({ promo, onAdd }) {
  const [added, setAdded] = useState(false);
  const { product, discount, origin } = promo;
  if (!product) return null;

  const finalPrice = applyDiscount(product.price, discount);

  const fmt = (n) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(n);

  const handleAdd = () => {
    onAdd?.(promo);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article
      id={`offer-card-${promo.id}`}
      className="bg-white rounded-3xl border border-stone-100
                 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* ── Image area ── */}
      <div className="relative bg-stone-50 aspect-[4/3] overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl select-none opacity-60">
              {getCategoryEmoji(product.category)}
            </span>
          </div>
        )}

        {/* Badge de descuento */}
        <div className="absolute top-3 right-3">
          <PromoBadge discount={discount} />
        </div>
      </div>

      {/* ── Info area ── */}
      <div className="px-4 pt-3 pb-4">
        {/* Nombre */}
        <h3 className="text-base font-extrabold text-stone-900 leading-tight">
          {product.name}
        </h3>

        {/* Origen + unidad */}
        <p className="text-[11px] uppercase font-semibold tracking-wider text-stone-400 mt-0.5">
          {origin ?? product.category} · {product.unit}
        </p>

        {/* Precios + botón agregar */}
        <div className="flex items-end justify-between mt-2.5">
          <div>
            {/* Precio original tachado */}
            <p className="text-xs text-stone-400 line-through leading-none">
              {fmt(product.price)}
            </p>
            {/* Precio final */}
            <p className="text-xl font-extrabold text-green-700 leading-tight mt-0.5">
              {fmt(finalPrice)}
            </p>
          </div>

          {/* Botón + */}
          <button
            id={`add-offer-${promo.id}`}
            type="button"
            onClick={handleAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center
                        font-bold text-white transition-all shadow-sm cursor-pointer
                        ${added
                          ? 'bg-green-500 scale-95'
                          : 'bg-green-900 hover:bg-green-800 active:scale-95'
                        }`}
          >
            {added ? <Check size={18} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </article>
  );
}
