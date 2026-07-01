import { Routes, Route, Navigate } from 'react-router-dom';
import { InventoryPage } from '../features/inventory';
import { FinanceDashboardPage } from '../features/finance';
import { LossPage } from '../features/losses';

/**
 * AppRouter – Centraliza todas las rutas de la aplicación.
 *
 * Rutas activas:
 *   /inventario  → InventoryPage
 *   /reportes    → FinanceDashboardPage
 *   /mermas      → LossPage
 *   /            → redirect a /reportes (dashboard como home)
 *
 * Rutas placeholder (próximamente):
 *   /ventas, /ajustes → redirect temporal a /reportes
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

      {/* Placeholders – redirigen al dashboard hasta que se implementen */}
      <Route path="/ventas"   element={<Navigate to="/reportes" replace />} />
      <Route path="/ajustes"  element={<Navigate to="/reportes" replace />} />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/reportes" replace />} />
    </Routes>
  );
}
