import { NavLink } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  DollarSign,
  Store,
  Leaf,
  Trash2,
  X,
  Tag,
  BadgePercent,
} from 'lucide-react';

/**
 * Sidebar – Lateral navigation panel.
 *
 * Modes:
 *  - Desktop (default): hidden on mobile, flex on ≥1024px, sticky full-height.
 *  - Mobile drawer (isMobileDrawer=true): always flex, full-height, no hidden class.
 *    AppShell handles the slide-in animation via transform classes.
 *
 * Props:
 *  - isMobileDrawer: render as drawer panel (no lg:flex trick needed)
 *  - onClose: called when the user clicks the × button inside the drawer
 */

const NAV_ITEMS = [
  { to: '/inventario',    icon: Package,      label: 'Inventario',  enabled: true },
  { to: '/mermas',        icon: Trash2,       label: 'Mermas',      enabled: true },
  { to: '/ventas',        icon: ShoppingCart, label: 'Ventas',      enabled: true },
  { to: '/ofertas',       icon: Tag,          label: 'Ofertas',     enabled: true },
  { to: '/reportes',      icon: DollarSign,   label: 'Finanzas',    enabled: true },
  { to: '/ajustes',       icon: Store,        label: 'Tienda',      enabled: false },
];

const ADMIN_ITEMS = [
  { to: '/admin/ofertas', icon: BadgePercent, label: 'Promos Admin', enabled: true },
];

export default function Sidebar({ isMobileDrawer = false, onClose }) {
  return (
    <aside
      id={isMobileDrawer ? 'sidebar-drawer' : 'sidebar'}
      className={`flex flex-col w-64 shrink-0 bg-white border-r border-stone-100
                  ${isMobileDrawer
                    ? 'h-full overflow-y-auto'
                    : 'hidden lg:flex min-h-screen sticky top-0 self-start'
                  }`}
      style={isMobileDrawer ? undefined : { height: '100vh' }}
    >
      {/* ── Branding ── */}
      <div className="px-6 pt-7 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl bg-green-900 flex items-center
                       justify-center shadow-sm shrink-0"
          >
            <Leaf size={18} className="text-white" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-extrabold text-stone-900 leading-none">
              Lillo
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest
                          text-green-700 mt-0.5">
              Gestión de Stock
            </p>
          </div>

          {/* Close button – only in drawer mode */}
          {isMobileDrawer && (
            <button
              id="drawer-close-btn"
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="w-8 h-8 flex items-center justify-center rounded-xl
                         text-stone-500 hover:bg-stone-100 hover:text-stone-700
                         transition-colors cursor-pointer shrink-0"
            >
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto"
        aria-label="Navegación principal"
      >
        {NAV_ITEMS.map(({ to, icon: Icon, label, enabled }) =>
          enabled ? (
            <NavLink
              key={to}
              to={to}
              id={`nav-${label.toLowerCase()}`}
              onClick={isMobileDrawer ? onClose : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm
                 font-medium transition-all text-left cursor-pointer no-underline
                 ${
                   isActive
                     ? 'bg-green-50 text-green-900'
                     : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-1 h-5 rounded-full shrink-0 transition-all
                                ${isActive ? 'bg-green-900' : 'bg-transparent'}`}
                  />
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ) : (
            <button
              key={to}
              id={`nav-${label.toLowerCase()}`}
              type="button"
              disabled
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm
                         font-medium text-stone-400 opacity-50 cursor-not-allowed text-left"
            >
              <span className="w-1 h-5 rounded-full shrink-0 bg-transparent" />
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
              <span
                className="ml-auto text-[9px] font-bold uppercase tracking-wider
                           px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-400"
              >
                pronto
              </span>
            </button>
          )
        )}

        {/* ── Separador Admin ── */}
        <div className="mx-2 my-2 border-t border-stone-100" />
        <p className="px-3 text-[9px] font-extrabold uppercase tracking-widest text-stone-400 mb-1">
          Admin
        </p>
        {ADMIN_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            id={`nav-${label.toLowerCase().replace(' ', '-')}`}
            onClick={isMobileDrawer ? onClose : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm
               font-medium transition-all text-left cursor-pointer no-underline
               ${
                 isActive
                   ? 'bg-orange-50 text-orange-800'
                   : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-1 h-5 rounded-full shrink-0 transition-all
                              ${isActive ? 'bg-orange-500' : 'bg-transparent'}`}
                />
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
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
