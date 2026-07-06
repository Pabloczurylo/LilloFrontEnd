import { useState } from 'react';
import { ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';

const MOTIVO_LABELS = {
  mal_estado: { label: 'Mal estado', emoji: '🥀', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  vencimiento: { label: 'Vencimiento', emoji: '📅', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  dano_fisico: { label: 'Daño físico', emoji: '🖼️', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  otro: { label: 'Otro', emoji: '📌', color: 'text-stone-600 bg-stone-50 border-stone-200' },
};

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function LossHistory({ records }) {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  if (!records || records.length === 0) return null;

  // Los registros del backend vienen ordenados desc por loss_date
  const visible = showAll ? records : records.slice(0, 5);

  const getCategoryEmoji = (categoryName = '') => {
    const name = categoryName.toLowerCase();
    if (name.includes('verdura')) return '🥬';
    if (name.includes('frut')) return '🍊';
    if (name.includes('pan')) return '🍞';
    if (name.includes('lact') || name.includes('láct')) return '🧀';
    return '📦';
  };

  return (
    <section className="mx-5 mb-6" aria-label="Historial de mermas">
      {/* Section header */}
      <button
        type="button"
        id="loss-history-toggle"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center justify-between w-full mb-3 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <ClipboardList size={15} className="text-green-800" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Historial de Mermas
          </span>
          <span className="text-[10px] font-bold bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
            {records.length}
          </span>
        </div>
        {expanded ? (
          <ChevronUp size={15} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
        ) : (
          <ChevronDown size={15} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
        )}
      </button>

      {expanded && (
        <div className="flex flex-col gap-2.5">
          {visible.map((record) => {
            const mInfo = MOTIVO_LABELS[record.reason] || MOTIVO_LABELS.otro;
            return (
              <div
                key={record.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm
                           px-4 py-3.5 flex items-center gap-3"
              >
                {/* Left: icon */}
                <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100
                                flex items-center justify-center shrink-0 text-xl">
                  {getCategoryEmoji(record.product?.category?.name)}
                </div>

                {/* Center: info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-stone-800 truncate">
                    {record.product?.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${mInfo.color}`}>
                      {mInfo.emoji} {mInfo.label}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {formatDate(record.loss_date)}
                    </span>
                  </div>
                  {record.notes && (
                    <p className="text-[11px] text-stone-400 mt-0.5 truncate italic">
                      "{record.notes}"
                    </p>
                  )}
                  {record.reporter?.full_name && (
                    <p className="text-[9px] text-stone-400 mt-0.5">
                      Reg: {record.reporter.full_name}
                    </p>
                  )}
                </div>

                {/* Right: quantity */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-extrabold text-red-600">
                    -{Number(record.quantity)}
                  </p>
                  <p className="text-[10px] text-stone-400 font-medium">
                    {record.product?.unit === 'unidad' ? 'UN' : record.product?.unit === 'kg' ? 'KG' : record.product?.unit?.toUpperCase() ?? 'UN'}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Show more / less */}
          {records.length > 5 && (
            <button
              type="button"
              id="loss-history-show-more"
              onClick={() => setShowAll((v) => !v)}
              className="flex items-center justify-center gap-1.5 py-2.5
                         text-xs font-semibold text-stone-500 hover:text-stone-700
                         transition-colors cursor-pointer"
            >
              {showAll ? (
                <>Mostrar menos <ChevronUp size={13} /></>
              ) : (
                <>Ver {records.length - 5} más <ChevronDown size={13} /></>
              )}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
