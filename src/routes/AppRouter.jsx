import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import AppShell from '../components/layout/AppShell';
import ClientShell from '../components/layout/ClientShell';

// Auth
import { LoginPage, ProtectedRoute } from '../features/auth';

// Admin features
import { InventoryPage } from '../features/inventory';
import { FinanceDashboardPage } from '../features/finance';
import { LossPage } from '../features/losses';
import { SalesPage } from '../features/sales';
import { AdminPromosPage } from '../features/promotions';

// Shared / Cliente features
import { OffersPage } from '../features/promotions';
import { ShopPage } from '../features/shop';
import { CartPage } from '../features/cart';

/**
 * AppRouter – Centraliza todas las rutas con RBAC.
 *
 * Rutas PÚBLICAS (cliente, sin autenticación):
 *   /login            → LoginPage        (sin shell)
 *   /pedido           → ShopPage         (ClientShell)
 *   /pedido/resumen   → CartPage         (ClientShell)
 *   /ofertas          → OffersPage       (ClientShell)
 *
 * Rutas PROTEGIDAS (solo admin autenticado):
 *   /inventario       → InventoryPage    (AppShell)
 *   /reportes         → FinanceDashboard (AppShell)
 *   /mermas           → LossPage         (AppShell)
 *   /ventas           → SalesPage        (AppShell)
 *   /admin/ofertas    → AdminPromosPage  (AppShell)
 *
 * Ruta raíz (/):
 *   - Si admin  → /reportes
 *   - Si cliente → /pedido
 */
function RootRedirect() {
  const { isAdmin } = useAuth();
  return <Navigate to={isAdmin ? '/reportes' : '/pedido'} replace />;
}

export default function AppRouter() {
  return (
    <Routes>

      {/* ── Login (sin shell) ── */}
      <Route path="/login" element={<LoginPage />} />

      {/* ── Rutas públicas de cliente ── */}
      <Route
        path="/pedido"
        element={
          <ClientShell>
            <ShopPage />
          </ClientShell>
        }
      />
      <Route
        path="/pedido/resumen"
        element={
          <ClientShell>
            <CartPage />
          </ClientShell>
        }
      />
      <Route
        path="/ofertas"
        element={
          <ClientShell>
            <OffersPage />
          </ClientShell>
        }
      />

      {/* ── Rutas protegidas (admin) ── */}
      <Route
        path="/inventario"
        element={
          <ProtectedRoute>
            <AppShell>
              <InventoryPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <ProtectedRoute>
            <AppShell>
              <FinanceDashboardPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mermas"
        element={
          <ProtectedRoute>
            <AppShell>
              <LossPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ventas"
        element={
          <ProtectedRoute>
            <AppShell>
              <SalesPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ofertas"
        element={
          <ProtectedRoute>
            <AppShell>
              <AdminPromosPage />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* ── Redirect raíz ── */}
      <Route path="/" element={<RootRedirect />} />

      {/* ── 404 fallback ── */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
