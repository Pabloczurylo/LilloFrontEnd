import { Search, SlidersHorizontal, ArrowDownAZ } from 'lucide-react';

/**
 * SearchFilter – Search bar with filter & sort buttons.
 * Provides real-time search input and action buttons for filtering/sorting.
 */
export default function SearchFilter({ searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search input */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        />
        <input
          id="search-products-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre o categoría..."
          className="w-full pl-11 pr-4 py-3 text-sm text-stone-700
                     placeholder:text-stone-400 bg-white border border-stone-200
                     rounded-2xl outline-none focus:border-green-700
                     focus:ring-2 focus:ring-green-700/20 transition-all"
        />
      </div>

      {/* Filter & Sort row */}
      <div className="flex items-center gap-3">
        <button
          id="filter-btn"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4
                     bg-white border border-stone-200 rounded-2xl text-sm
                     text-stone-600 font-medium hover:bg-stone-50
                     transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          Filtros
        </button>

        <button
          id="sort-btn"
          className="w-11 h-11 flex items-center justify-center rounded-2xl
                     bg-white border border-stone-200 text-stone-500
                     hover:bg-stone-50 transition-colors cursor-pointer"
          aria-label="Ordenar alfabéticamente"
        >
          <ArrowDownAZ size={18} />
        </button>
      </div>
    </div>
  );
}
