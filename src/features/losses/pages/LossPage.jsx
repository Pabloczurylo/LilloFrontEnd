import { useState, useEffect, useCallback } from 'react';
import { getLossesAPI } from '../../../services/lossesService';
import LossForm from '../components/LossForm';
import LossHistory from '../components/LossHistory';
import { RefreshCw, AlertCircle } from 'lucide-react';

/**
 * LossPage – Feature page for registering merchandise losses (mermas).
 *
 * Conectada al backend (GET /api/inventory/losses y POST /api/inventory/losses).
 */
export default function LossPage() {
  const [lossRecords, setLossRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLosses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLossesAPI();
      setLossRecords(data);
    } catch (err) {
      console.error('Error loading losses:', err);
      setError('No se pudo cargar el historial de mermas. Asegurate de estar autenticado.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLosses();
  }, [loadLosses]);

  const handleNewRecord = () => {
    // Al registrar una nueva merma, recargamos el historial completo para sincronizar
    loadLosses();
  };

  /* ---- Loading State ---- */
  if (loading && lossRecords.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f5]">
        <span className="w-10 h-10 rounded-full border-3 border-stone-200 border-t-green-800 animate-spin" />
        <p className="text-sm font-semibold text-stone-400">Cargando mermas…</p>
      </div>
    );
  }

  /* ---- Error State ---- */
  if (error && lossRecords.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-[#faf8f5]">
        <AlertCircle size={40} className="text-red-500" />
        <p className="text-base font-bold text-stone-700 text-center">{error}</p>
        <button
          type="button"
          onClick={loadLosses}
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
      <div className="px-5 pt-6 pb-5 lg:px-8 lg:pt-8">
        <p className="text-xs font-bold uppercase tracking-widest text-green-800">
          Control de Stock
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-black mt-1.5 leading-tight">
          Registrar Merma
        </h1>
        <p className="text-sm text-stone-400 mt-2 leading-relaxed">
          Documenta las pérdidas de inventario para mantener el stock actualizado.
        </p>
      </div>

      {/* ── Main layout: 1-col mobile, 2-col desktop ── */}
      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-6 lg:px-8 lg:pb-10">

        {/* Form column */}
        <div className="pb-4">
          <LossForm onSuccess={handleNewRecord} />
        </div>

        {/* History column (desktop: sidebar-right; mobile: below form) */}
        <div className="lg:pt-0 pt-2">
          <LossHistory records={lossRecords} />

          {/* Desktop empty state */}
          {lossRecords.length === 0 && (
            <div
              className="hidden lg:flex flex-col items-center justify-center
                         mx-5 lg:mx-0 py-12 bg-white rounded-2xl border border-dashed
                         border-stone-200 text-center gap-3"
            >
              <span className="text-4xl">📋</span>
              <p className="text-sm font-semibold text-stone-500">
                Sin registros aún
              </p>
              <p className="text-xs text-stone-400 max-w-[200px] leading-relaxed">
                Las mermas registradas aparecerán aquí en tiempo real.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
