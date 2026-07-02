import { NavLink } from 'react-router-dom';
import { ShoppingBag, Tag, LogIn, Leaf } from 'lucide-react';
import { useCart } from '../../context/CartContext';

/**
 * ClientShell – Layout simplificado para las rutas públicas de cliente.
 *
 * No muestra el sidebar de admin ni el BottomNav completo.
 * Incluye:
 *  - Header superior con branding + botón Login
 *  - BottomNav simple con tabs: Pedido, Ofertas
 */

const CLIENT_TABS = [
  { to: '/pedido',          icon: ShoppingBag, label: 'Pedido' },
  { to: '/ofertas',         icon: Tag,         label: 'Ofertas' },
];

function ClientBottomNav() {
  const { totalItems } = useCart();

  return (
    <nav
      id="client-bottom-nav"
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-100"
      aria-label="Navegación cliente"
    >
      <ul className="flex items-center justify-around py-2 px-2">
        {CLIENT_TABS.map(({ to, icon: Icon, label }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              id={`client-tab-${label.toLowerCase()}`}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl
                 transition-colors cursor-pointer relative
                 ${isActive ? 'text-green-900' : 'text-stone-400 hover:text-stone-600'}`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                    {/* Badge de items en tab Pedido */}
                    {to === '/pedido' && totalItems > 0 && (
                      <span
                        className="absolute -top-2 -right-2 w-4 h-4 rounded-full
                                   flex items-center justify-center text-[9px] font-extrabold text-white"
                        style={{ background: '#1a5c1a' }}
                      >
                        {totalItems > 9 ? '9+' : totalItems}
                      </span>
                    )}
                  </div>
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

function ClientHeader() {
  return (
    <header
      id="client-header"
      className="lg:hidden flex items-center justify-between px-5 py-4
                 bg-white border-b border-stone-100 sticky top-0 z-40"
    >
      {/* Branding */}
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: '#edfaf0' }}
        >
          <Leaf size={14} strokeWidth={2} style={{ color: '#1a5c1a' }} />
        </div>
        <p className="text-base font-extrabold" style={{ color: '#0f2910' }}>
          Verdulería Lillo
        </p>
      </div>

      {/* Botón Admin Login */}
      <NavLink
        to="/login"
        id="client-header-login-btn"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold
                   transition-colors hover:opacity-80"
        style={{ background: '#edfaf0', color: '#1a5c1a' }}
      >
        <LogIn size={14} strokeWidth={2} />
        Admin
      </NavLink>
    </header>
  );
}

/** Sidebar simplificado en desktop para clientes */
function ClientSidebarDesktop() {
  const { totalItems } = useCart();

  return (
    <aside
      id="client-sidebar"
      className="hidden lg:flex flex-col w-56 shrink-0 bg-white border-r border-stone-100
                 min-h-screen sticky top-0 self-start"
      style={{ height: '100vh' }}
    >
      {/* Branding */}
      <div className="px-6 pt-7 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm shrink-0"
            style={{ background: '#edfaf0' }}
          >
            <Leaf size={18} style={{ color: '#1a5c1a' }} strokeWidth={2} />
          </div>
          <div>
            <p className="text-base font-extrabold text-stone-900 leading-none">Lillo</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest mt-0.5" style={{ color: '#2d7d2d' }}>
              Verdulería
            </p>
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1" aria-label="Navegación cliente">
        {CLIENT_TABS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            id={`client-sidebar-${label.toLowerCase()}`}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm
               font-medium transition-all text-left cursor-pointer no-underline
               ${isActive
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
                <div className="relative">
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  {to === '/pedido' && totalItems > 0 && (
                    <span
                      className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full
                                 flex items-center justify-center text-[9px] font-extrabold text-white"
                      style={{ background: '#1a5c1a' }}
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Login admin link */}
      <div className="px-4 pb-6 pt-2 border-t border-stone-100">
        <NavLink
          to="/login"
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium
                     text-stone-400 hover:bg-stone-50 hover:text-stone-600 transition-all no-underline"
        >
          <LogIn size={16} strokeWidth={1.5} />
          Acceso Admin
        </NavLink>
      </div>
    </aside>
  );
}

/**
 * ClientShell – Wrapper de layout para rutas públicas de cliente.
 */
export default function ClientShell({ children }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#faf8f5' }}>
      {/* Sidebar desktop */}
      <ClientSidebarDesktop />

      {/* Columna de contenido */}
      <div className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
        {/* Header mobile */}
        <ClientHeader />

        {/* Contenido */}
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>

        {/* Bottom nav mobile */}
        <ClientBottomNav />
      </div>
    </div>
  );
}
