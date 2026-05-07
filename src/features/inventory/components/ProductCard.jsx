import { Pencil, Trash2 } from 'lucide-react';

/**
 * ProductCard – Displays a single product in the inventory list.
 * Matches the mockup style: image on the left, info on the right,
 * category badge, price, unit, and edit/delete action buttons.
 */
export default function ProductCard({ product, onEdit, onDelete }) {
  const { id, name, ref, price, category, unit, imageUrl } = product;

  /** Map category names to Tailwind badge colour classes */
  const categoryColors = {
    Verduras:  'bg-green-100 text-green-800',
    Frutas:    'bg-orange-100 text-orange-800',
    Panadería: 'bg-amber-100 text-amber-800',
    Almacén:   'bg-yellow-100 text-yellow-800',
    Lácteos:   'bg-blue-100 text-blue-800',
  };

  const badgeClasses =
    categoryColors[category] ?? 'bg-gray-100 text-gray-700';

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <article
      id={`product-card-${id}`}
      className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm
                 border border-stone-100 transition-shadow hover:shadow-md"
    >
      {/* Product image */}
      <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-stone-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info block */}
      <div className="flex-1 min-w-0">
        {/* Name & ref */}
        <h3 className="text-base font-semibold text-stone-900 leading-tight truncate">
          {name}
        </h3>
        <p className="text-xs text-stone-400 mt-0.5">Ref: {ref}</p>

        {/* Category badge */}
        <span
          className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wider
                      px-2.5 py-0.5 rounded-full ${badgeClasses}`}
        >
          {category}
        </span>

        {/* Price & unit */}
        <p className="mt-2 text-lg font-bold text-stone-900 leading-none">
          {formattedPrice}
        </p>
        <p className="text-[11px] text-stone-400 uppercase tracking-wide">
          por {unit}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 shrink-0 pt-1">
        <button
          id={`edit-product-${id}`}
          onClick={() => onEdit?.(product)}
          className="w-9 h-9 flex items-center justify-center rounded-xl
                     bg-stone-100 text-stone-500 hover:bg-green-900 hover:text-white
                     transition-colors cursor-pointer"
          aria-label={`Editar ${name}`}
        >
          <Pencil size={16} />
        </button>

        <button
          id={`delete-product-${id}`}
          onClick={() => onDelete?.(id)}
          className="w-9 h-9 flex items-center justify-center rounded-xl
                     bg-red-50 text-red-500 hover:bg-red-600 hover:text-white
                     transition-colors cursor-pointer"
          aria-label={`Eliminar ${name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
