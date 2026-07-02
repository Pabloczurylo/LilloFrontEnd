import { Routes, Route, Navigate } from 'react-router-dom';
import { InventoryPage } from '../features/inventory';
import { FinanceDashboardPage } from '../features/finance';
import { LossPage } from '../features/losses';
import { SalesPage } from '../features/sales';
import { OffersPage, AdminPromosPage } from '../features/promotions';

/**
 * AppRouter – Centraliza todas las rutas de la aplicación.
 *
 * Rutas activas:
 *   /inventario    → InventoryPage
 *   /reportes      → FinanceDashboardPage
 *   /mermas        → LossPage
 *   /ventas        → SalesPage
 *   /ofertas       → OffersPage       (vista cliente)
 *   /admin/ofertas → AdminPromosPage  (vista admin)
 *   /              → redirect a /reportes (dashboard como home)
 */
export default function AppRouter() {
  return (
    <Routes>
      {/* Default redirect → dashboard de finanzas como home */}
      <Route path="/" element={<Navigate to="/reportes" replace />} />

      {/* Inventario */}
      <Route path="/inventario" element={<InventoryPage />} />

      {/* Finanzas / Reportes */}
      <Route path="/reportes" element={<FinanceDashboardPage />} />

      {/* Mermas – Registro de pérdidas por mal estado */}
      <Route path="/mermas" element={<LossPage />} />

      {/* Ventas – Registro de ventas y canasta */}
      <Route path="/ventas" element={<SalesPage />} />

      {/* Ofertas – Vista de cliente con promociones activas */}
      <Route path="/ofertas" element={<OffersPage />} />

      {/* Admin – Panel de gestión de promociones */}
      <Route path="/admin/ofertas" element={<AdminPromosPage />} />

      {/* Placeholder – redirige al dashboard hasta que se implemente */}
      <Route path="/ajustes" element={<Navigate to="/reportes" replace />} />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/reportes" replace />} />
    </Routes>
  );
}

