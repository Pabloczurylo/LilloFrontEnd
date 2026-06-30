import Sidebar from './Sidebar';

/**
 * AppShell – Root layout wrapper.
 *
 * Mobile  (<1024px): renderiza solo los children (comportamiento actual).
 * Desktop (≥1024px): sidebar fijo a la izquierda + área de contenido scrolleable a la derecha.
 */
export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen bg-[#faf8f5]">
      {/* Sidebar – visible solo en desktop */}
      <Sidebar />

      {/* Content area */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
