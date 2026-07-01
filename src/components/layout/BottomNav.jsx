import { NavLink } from 'react-router-dom';
import { ShoppingCart, Package, BarChart2, Settings, Trash2 } from 'lucide-react';

/**
 * BottomNav – Tab bar de navegación inferior, visible solo en mobile (<1024px).
 * Usa NavLink de react-router-dom para activar el tab actual con color verde.
 */

const TABS = [
  { to: '/inventario', icon: Package,      label: 'Inventario' },
  { to: '/mermas',     icon: Trash2,       label: 'Mermas' },
  { to: '/reportes',   icon: BarChart2,    label: 'Reportes' },
  { to: '/ajustes',    icon: Settings,     label: 'Ajustes' },
];

export default function BottomNav() {
  return (
    <nav
      id="bottom-nav"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white
                 border-t border-stone-100 safe-bottom"
      aria-label="Navegación principal"
    >
      <ul className="flex items-center justify-around py-2 px-2">
        {TABS.map(({ to, icon: Icon, label }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              id={`tab-${label.toLowerCase()}`}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl
                 transition-colors cursor-pointer
                 ${isActive
                   ? 'text-green-900'
                   : 'text-stone-400 hover:text-stone-600'
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide leading-none
                                ${isActive ? 'text-green-900' : 'text-stone-400'}`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
