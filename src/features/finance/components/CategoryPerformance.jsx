import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const fmt = (n) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(n);

/** Map category id to Tailwind color classes for badge/bg */
const colorMap = {
  green:  { bg: 'bg-green-50',  ring: 'ring-green-200',  text: 'text-green-700' },
  orange: { bg: 'bg-orange-50', ring: 'ring-orange-200', text: 'text-orange-700' },
  blue:   { bg: 'bg-blue-50',   ring: 'ring-blue-200',   text: 'text-blue-700' },
  amber:  { bg: 'bg-amber-50',  ring: 'ring-amber-200',  text: 'text-amber-700' },
};

/**
 * CategoryPerformance – Sección con scroll horizontal de tarjetas por categoría
 * y un link a "Estadísticas de Productos".
 */
export default function CategoryPerformance({ categorias, onVerEstadisticas }) {
  return (
    <section id="category-performance" className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-stone-900 leading-tight">
          Rendimiento por Categoría
        </h2>
        <button
          id="ver-estadisticas-btn"
          onClick={onVerEstadisticas}
          className="flex items-center gap-1 text-[11px] font-semibold text-green-700
                     hover:text-green-900 transition-colors cursor-pointer"
        >
          Estadísticas de Productos
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-5 px-5
                      lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-x-visible">
        {categorias.map((cat) => {
          const colors = colorMap[cat.color] ?? colorMap.green;
          const esPositiva = cat.variacion >= 0;

          return (
            <article
              key={cat.id}
              className={`shrink-0 w-36 rounded-2xl p-3.5 flex flex-col gap-2
                          border border-stone-100 bg-white shadow-sm
                          hover:shadow-md transition-shadow
                          lg:w-44`}
            >
              {/* Icon badge */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center
                            text-lg ${colors.bg} ring-1 ${colors.ring}`}
              >
                {cat.icono}
              </div>

              {/* Name */}
              <p className="text-sm font-bold text-stone-900">{cat.nombre}</p>

              {/* Amount */}
              <p className="text-base font-extrabold text-stone-900 leading-none">
                {fmt(cat.monto)}
              </p>

              {/* Variation */}
              <div className="flex items-center gap-1">
                {esPositiva ? (
                  <TrendingUp size={12} className="text-green-600" strokeWidth={2.5} />
                ) : (
                  <TrendingDown size={12} className="text-red-500" strokeWidth={2.5} />
                )}
                <span
                  className={`text-[10px] font-semibold ${
                    esPositiva ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {esPositiva ? '+' : ''}{cat.variacion}% esta semana
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
