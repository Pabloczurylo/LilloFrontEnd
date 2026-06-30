import { Plus } from 'lucide-react';
import BalanceCard from '../components/BalanceCard';
import CategoryPerformance from '../components/CategoryPerformance';
import LibroDiario from '../components/LibroDiario';
import PendingAlert from '../components/PendingAlert';
import { mockBalance, mockCategorias, mockMovimientos } from '../utils/mockMovimientos';

/**
 * FinanceDashboardPage – Dashboard principal de Finanzas / Reportes.
 * Muestra balance del día, rendimiento por categoría y libro diario de movimientos.
 */
export default function FinanceDashboardPage() {
  const handleAgregarMovimiento = () => {
    console.log('Abrir modal: Agregar movimiento');
  };

  const handleMetricas = () => {
    console.log('Navegar a: Métricas Mensuales');
  };

  const handleVerEstadisticas = () => {
    console.log('Navegar a: Estadísticas de Productos');
  };

  return (
    <div className="relative min-h-screen px-5 py-6 flex flex-col gap-6
                    lg:px-8 lg:py-8">

      {/* ── Balance card ── */}
      <BalanceCard
        balance={mockBalance}
        onAgregarMovimiento={handleAgregarMovimiento}
        onMetricas={handleMetricas}
      />

      {/* ── Rendimiento por Categoría ── */}
      <CategoryPerformance
        categorias={mockCategorias}
        onVerEstadisticas={handleVerEstadisticas}
      />

      {/* ── Libro Diario ── */}
      <LibroDiario
        movimientos={mockMovimientos}
        fecha={mockBalance.fecha}
      />

      {/* ── Pendientes alert ── */}
      <PendingAlert count={mockBalance.pendientes} />

      {/* ── FAB: Agregar movimiento ── */}
      <button
        id="fab-agregar-movimiento"
        onClick={handleAgregarMovimiento}
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
