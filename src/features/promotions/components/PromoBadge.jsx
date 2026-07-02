/**
 * PromoBadge – Badge de descuento "-40%" estilo precio tachado.
 * Aparece en la esquina superior derecha de la OfferCard.
 *
 * Props:
 *  - discount : number (0-100) – porcentaje de descuento
 *  - size     : 'sm' | 'md'   – tamaño del badge
 */
export default function PromoBadge({ discount, size = 'md' }) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-0.5 font-extrabold rounded-full
                  bg-orange-500 text-white shadow-sm
                  ${sizeClasses[size]}`}
    >
      🏷 -{discount}%
    </span>
  );
}
