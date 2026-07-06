import { OFFER_CATEGORIES } from '../utils/promotionsUtils';

/**
 * CategoryFilterBar – Barra de filtros de categoría con scroll horizontal.
 *
 * Props:
 *  - selected    : string    – categoría actualmente seleccionada
 *  - onChange    : (cat) => void
 *  - counts      : Record<string, number>  – cantidad de ofertas por categoría (opcional)
 */
export default function CategoryFilterBar({ selected, onChange, counts = {} }) {
  return (
    <div
      id="category-filter-bar"
      className="flex items-center gap-2 overflow-x-auto
                 scrollbar-none pb-1 px-5 lg:px-0"
      style={{ scrollbarWidth: 'none' }}
    >
      {OFFER_CATEGORIES.map((cat) => {
        const isActive = selected === cat;
        const count = counts[cat];
        return (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase()}`}
            type="button"
            onClick={() => onChange(cat)}
            className={`flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full
                        text-sm font-semibold transition-all cursor-pointer
                        ${isActive
                          ? 'bg-green-900 text-white shadow-sm'
                          : 'bg-white text-stone-600 border border-stone-200 hover:border-green-700 hover:text-green-800'
                        }`}
          >
            {cat}
            {count !== undefined && count > 0 && (
              <span
                className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full
                            ${isActive
                              ? 'bg-white/25 text-white'
                              : 'bg-green-100 text-green-800'
                            }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
