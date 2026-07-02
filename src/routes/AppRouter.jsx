import { Routes, Route, Navigate } from 'react-router-dom';
import { InventoryPage } from '../features/inventory';
import { FinanceDashboardPage } from '../features/finance';
import { LossPage } from '../features/losses';
import { SalesPage } from '../features/sales';
import { OffersPage, AdminPromosPage } from '../features/promotions';
import { ShopPage } from '../features/shop';
import { CartPage } from '../features/cart';

/**
 * AppRouter – Centraliza todas las rutas de la aplicación.
 *
 * Rutas activas:
 *   /inventario       → InventoryPage
 *   /reportes         → FinanceDashboardPage
 *   /mermas           → LossPage
 *   /ventas           → SalesPage
 *   /ofertas          → OffersPage       (vista cliente promociones)
 *   /admin/ofertas    → AdminPromosPage  (vista admin)
 *   /pedido           → ShopPage         (catálogo de pedido cliente)
 *   /pedido/resumen   → CartPage         (resumen + envío WhatsApp)
 *   /                 → redirect a /reportes (dashboard como home)
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

      {/* Pedido – Catálogo para armar pedido por WhatsApp */}
      <Route path="/pedido" element={<ShopPage />} />

      {/* Pedido Resumen – Revisión y envío del pedido por WhatsApp */}
      <Route path="/pedido/resumen" element={<CartPage />} />

      {/* Placeholder – redirige al dashboard hasta que se implemente */}
      <Route path="/ajustes" element={<Navigate to="/reportes" replace />} />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/reportes" replace />} />
    </Routes>
  );
}

