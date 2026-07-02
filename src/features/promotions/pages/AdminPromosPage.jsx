import { BadgePercent, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePromotions } from '../../../context/PromotionsContext';
import PromoForm from '../components/PromoForm';
import PromoListItem from '../components/PromoListItem';
import EmptyOffersState from '../components/EmptyOffersState';

/**
 * AdminPromosPage – Panel de administración de promociones.
 * Ruta: /admin/ofertas
 *
 * Responsive:
 *  - Mobile  (<1024px): formulario arriba, lista de promos debajo.
 *  - Desktop (≥1024px): 2 columnas – form izquierda (sticky), lista derecha.
 */
export default function AdminPromosPage() {
  const { promotions, addPromotion, togglePromotion, removePromotion } =
    usePromotions();
  const navigate = useNavigate();

  const activeCount = promotions.filter((p) => p.active).length;

  return (
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ── Page header ── */}
      <div className="px-5 pt-6 pb-5 lg:px-8 lg:pt-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-green-800 mb-1">
            Panel Admin
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
            Armar Promos
          </h1>
          <p className="text-sm text-stone-400 mt-1.5 leading-relaxed">
            Configura nuevas ofertas para el catálogo.
          </p>
        </div>

        {/* Botón ver ofertas (vista cliente) */}
        <button
          id="view-offers-btn"
          type="button"
          onClick={() => navigate('/ofertas')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                     bg-green-50 border border-green-200 text-green-800
                     text-xs font-bold uppercase tracking-wider
                     hover:bg-green-100 transition-colors cursor-pointer shrink-0 mt-1"
        >
          <Eye size={13} strokeWidth={2} />
          Ver ofertas
        </button>
      </div>

      {/* ── Stats bar ── */}
      <div className="px-5 mb-5 lg:px-8">
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-stone-100
                        shadow-sm px-4 py-3">
          <BadgePercent size={18} className="text-orange-500 shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-stone-500">Promos configuradas</p>
            <p className="text-sm font-extrabold text-stone-800">
              {activeCount} activas de {promotions.length} totales
            </p>
          </div>
          {activeCount > 0 && (
            <span className="text-[10px] font-bold bg-orange-100 text-orange-700
                             px-2 py-0.5 rounded-full border border-orange-200">
              En vivo
            </span>
          )}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="lg:grid lg:grid-cols-[420px_1fr] lg:gap-6 lg:px-8 lg:pb-10">

        {/* ── LEFT: Formulario ── */}
        <div className="px-5 pb-5 lg:px-0 lg:pb-0">
          <div className="lg:sticky lg:top-6">
            <PromoForm onActivate={addPromotion} />
          </div>
        </div>

        {/* ── RIGHT: Lista de promos ── */}
        <div className="px-5 pb-24 lg:px-0 lg:pb-0">
          {/* Header sección lista */}
          <div className="flex items-center gap-2 mb-4">
            <BadgePercent size={15} className="text-green-800" />
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Promociones configuradas
            </p>
            {promotions.length > 0 && (
              <span className="text-[10px] font-bold bg-green-100 text-green-800
                               px-1.5 py-0.5 rounded-full">
                {promotions.length}
              </span>
            )}
          </div>

          {promotions.length === 0 ? (
            <EmptyOffersState
              title="Sin promos aún"
              subtitle="Usá el formulario para crear tu primera oferta."
            />
          ) : (
            <div className="flex flex-col gap-2.5">
              {promotions.map((promo) => (
                <PromoListItem
                  key={promo.id}
                  promo={promo}
                  onToggle={togglePromotion}
                  onDelete={removePromotion}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
