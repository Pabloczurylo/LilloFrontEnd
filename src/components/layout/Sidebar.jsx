import {
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Store,
  Leaf,
} from 'lucide-react';

/**
 * Sidebar – Lateral navigation panel, visible only on desktop (≥1024px).
 * Each nav item has an icon, label and active state.
 * Placeholder items for future sections are rendered with reduced opacity.
 */

const NAV_ITEMS = [
  { id: 'inventory', icon: Package, label: 'Inventario', active: true },
  { id: 'pos', icon: ShoppingCart, label: 'POS', active: false },
  { id: 'sales', icon: TrendingUp, label: 'Ventas', active: false },
  { id: 'finance', icon: DollarSign, label: 'Finanzas', active: false },
  { id: 'shop', icon: Store, label: 'Tienda', active: false },
];

export default function Sidebar() {
  return (
    <aside
      id="sidebar"
      className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen
                 bg-white border-r border-stone-100 sticky top-0 self-start"
      style={{ height: '100vh' }}
    >
      {/* ── Branding ── */}
      <div className="px-6 pt-7 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl bg-green-900 flex items-center
                       justify-center shadow-sm"
          >
            <Leaf size={18} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-base font-extrabold text-stone-900 leading-none">
              Lillo
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest
                          text-green-700 mt-0.5">
              Gestión de Stock
            </p>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1" aria-label="Navegación principal">
        {NAV_ITEMS.map(({ id, icon: Icon, label, active }) => (
          <button
            key={id}
            id={`nav-${id}`}
            type="button"
            disabled={!active}
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm
              font-medium transition-all text-left cursor-pointer
              ${
                active
                  ? 'bg-green-50 text-green-900'
                  : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600 opacity-60'
              }
            `}
            aria-current={active ? 'page' : undefined}
          >
            {/* Active indicator bar */}
            <span
              className={`
                w-1 h-5 rounded-full shrink-0 transition-all
                ${active ? 'bg-green-900' : 'bg-transparent'}
              `}
            />
            <Icon size={18} strokeWidth={active ? 2 : 1.5} />
            <span>{label}</span>

            {/* "Coming soon" badge for placeholders */}
            {!active && (
              <span
                className="ml-auto text-[9px] font-bold uppercase tracking-wider
                           px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-400"
              >
                pronto
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="px-6 py-5 border-t border-stone-100">
        <p className="text-[10px] text-stone-300 leading-relaxed">
          © 2025 Lillo · v0.1
        </p>
      </div>
    </aside>
  );
}
