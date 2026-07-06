import { useState, useEffect, useCallback } from 'react';
import { Plus, RefreshCw, AlertCircle } from 'lucide-react';
import BalanceCard from '../components/BalanceCard';
import LibroDiario from '../components/LibroDiario';
import NewMovementModal from '../components/NewMovementModal';
import { getLedgerEntriesAPI, getLedgerSummaryAPI, createLedgerEntryAPI } from '../../../services/ledgerService';

export default function FinanceDashboardPage() {
  const [balance, setBalance] = useState({ ingresos: 0, egresos: 0, neto: 0, fecha: '' });
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Tomamos hoy como rango para el balance diario
      const today = new Date().toISOString().split('T')[0];
      const from = `${today}T00:00:00.000Z`;
      const to = `${today}T23:59:59.999Z`;

      const [summary, entries] = await Promise.all([
        getLedgerSummaryAPI({ from, to }),
        getLedgerEntriesAPI(), // Traemos asientos recientes para el listado general
      ]);

      setBalance({
        ingresos: Number(summary.total_income),
        egresos: Number(summary.total_expense),
        neto: Number(summary.net_balance),
        fecha: new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' }),
      });

      // Mapeamos asientos de la API a la estructura esperada por LibroDiario
      setMovimientos(entries.map(e => ({
        id: e.id,
        tipo: e.transaction_type === 'ingreso' ? 'entrada' : 'salida',
        categoria: e.transaction_type === 'ingreso' ? 'Ventas' : 'Caja',
        concepto: e.concept,
        monto: Number(e.amount),
        hora: new Date(e.transaction_date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        quien: e.registrar?.full_name ?? 'Administrador',
      })));
    } catch (err) {
      console.error('Error fetching finance dashboard:', err);
      setError('No se pudo cargar la información financiera.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAgregarMovimiento = async (newMovement) => {
    try {
      await createLedgerEntryAPI(newMovement);
      await loadData();
    } catch (err) {
      console.error('Error creating movement:', err);
      alert('Ocurrió un error al guardar el movimiento.');
    }
  };

  /* ---- Loading State ---- */
  if (loading && movimientos.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f5]">
        <span className="w-10 h-10 rounded-full border-3 border-stone-200 border-t-green-800 animate-spin" />
        <p className="text-sm font-semibold text-stone-400">Calculando balance diario…</p>
      </div>
    );
  }

  /* ---- Error State ---- */
  if (error && movimientos.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-[#faf8f5]">
        <AlertCircle size={40} className="text-red-500" />
        <p className="text-base font-bold text-stone-700 text-center">{error}</p>
        <button
          type="button"
          onClick={loadData}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-green-900 cursor-pointer hover:bg-green-800"
        >
          <RefreshCw size={15} />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-5 py-6 flex flex-col gap-6 lg:px-8 lg:py-8">

      {/* ── Balance card ── */}
      <BalanceCard
        balance={balance}
        onAgregarMovimiento={() => setIsModalOpen(true)}
        onMetricas={() => console.log('Estadísticas')}
      />

      {/* ── Libro Diario ── */}
      <LibroDiario
        movimientos={movimientos}
        fecha={balance.fecha}
      />

      {/* Modal para ingresar nuevos movimientos */}
      <NewMovementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAgregarMovimiento}
      />

      {/* ── FAB: Agregar movimiento ── */}
      <button
        id="fab-agregar-movimiento"
        onClick={() => setIsModalOpen(true)}
        className="lg:hidden fixed bottom-20 right-5 z-50
                   w-14 h-14 bg-green-900 hover:bg-green-800 active:bg-green-950
                   text-white rounded-full shadow-lg flex items-center justify-center
                   transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Agregar movimiento"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>
    </div>
  );
}
