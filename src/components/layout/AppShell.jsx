import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import BottomNav from './BottomNav';

/**
 * AppShell – Root layout wrapper.
 *
 * Mobile  (<1024px):
 *   - MobileHeader sticky en top
 *   - Hamburger abre un drawer (overlay) con el Sidebar
 *   - BottomNav fixed en bottom
 *
 * Desktop (≥1024px):
 *   - Sidebar fijo a la izquierda (siempre visible)
 *   - Área de contenido scrolleable a la derecha
 */
export default function AppShell({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen bg-[#faf8f5]">

      {/* ── Desktop Sidebar (always visible ≥1024px) ── */}
      <Sidebar />

      {/* ── Mobile Drawer Overlay ── */}
      {/* Backdrop */}
      <div
        id="drawer-backdrop"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
                    transition-opacity duration-300
                    ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer panel – slides in from left */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72
                    bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
                    ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Pass a close handler so NavLinks inside Sidebar can close the drawer */}
        <Sidebar onClose={() => setDrawerOpen(false)} isMobileDrawer />
      </div>

      {/* ── Content column ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
        {/* Mobile top header */}
        <MobileHeader
          storeName="La Huerta"
          onMenuOpen={() => setDrawerOpen(true)}
        />

        {/* Page content – padding-bottom en mobile para el BottomNav */}
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <BottomNav />
      </div>
    </div>
  );
}
