import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import BottomNav from './BottomNav';

/**
 * AppShell – Root layout wrapper.
 *
 * Mobile  (<1024px):
 *   - MobileHeader sticky en top
 *   - Contenido con padding-bottom para no quedar bajo el BottomNav
 *   - BottomNav fixed en bottom
 *
 * Desktop (≥1024px):
 *   - Sidebar fijo a la izquierda
 *   - Área de contenido scrolleable a la derecha
 */
export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen bg-[#faf8f5]">
      {/* Sidebar – solo desktop */}
      <Sidebar />

      {/* Content column */}
      <div className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
        {/* Mobile top header */}
        <MobileHeader storeName="Verdulería" />

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
