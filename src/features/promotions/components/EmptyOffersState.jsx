import { Tag } from 'lucide-react';

/**
 * EmptyOffersState – Pantalla vacía compartida entre la vista cliente y admin.
 *
 * Props:
 *  - title    : string
 *  - subtitle : string
 *  - icon     : ReactNode (opcional, usa Tag por defecto)
 */
export default function EmptyOffersState({
  title = 'Sin ofertas activas',
  subtitle = 'Las ofertas activadas aparecerán aquí.',
  icon,
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3
                 py-16 text-center"
    >
      <div
        className="w-16 h-16 rounded-3xl bg-stone-100 border border-stone-200
                   flex items-center justify-center"
      >
        {icon ?? <Tag size={28} className="text-stone-300" strokeWidth={1.5} />}
      </div>
      <p className="text-base font-bold text-stone-500">{title}</p>
      <p className="text-sm text-stone-400 max-w-[220px] leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
