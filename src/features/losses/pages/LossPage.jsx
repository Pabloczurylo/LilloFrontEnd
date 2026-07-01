import { useState } from 'react';
import LossForm from '../components/LossForm';
import LossHistory from '../components/LossHistory';

/**
 * LossPage – Feature page for registering merchandise losses (mermas).
 *
 * Responsive layout:
 *  - Mobile  (<1024px): single column, form on top, history below.
 *  - Desktop (≥1024px): two-column grid (form left, history right).
 */
export default function LossPage() {
  const [lossRecords, setLossRecords] = useState([]);

  const handleNewRecord = (record) => {
    setLossRecords((prev) => [record, ...prev]);
  };

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
