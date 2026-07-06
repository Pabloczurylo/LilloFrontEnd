import { BadgePercent, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePromotions } from '../../../context/PromotionsContext';
import PromoForm from '../components/PromoForm';
import PromoListItem from '../components/PromoListItem';
import EmptyOffersState from '../components/EmptyOffersState';

export default function AdminPromosPage() {
  const { promotions, loading, error, addPromotion, togglePromotion, removePromotion, refetch } =
    usePromotions();
  const navigate = useNavigate();

  const activeCount = promotions.filter((p) => p.is_active).length;

  /* ---- Loading State ---- */
  if (loading && promotions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f5]">
        <span className="w-10 h-10 rounded-full border-3 border-stone-200 border-t-green-800 animate-spin" />
        <p className="text-sm font-semibold text-stone-400">Cargando ofertas y promociones…</p>
      </div>
    );
  }

  /* ---- Error State ---- */
  if (error && promotions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-[#faf8f5]">
        <AlertCircle size={40} className="text-red-500" />
        <p className="text-base font-bold text-stone-700 text-center">{error}</p>
        <button
          type="button"
          onClick={refetch}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-green-900 cursor-pointer hover:bg-green-800"
        >
          <RefreshCw size={15} />
          Reintentar
        </button>
      </div>
    );
  }

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
