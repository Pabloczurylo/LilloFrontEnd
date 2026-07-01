import { Menu } from 'lucide-react';

/**
 * MobileHeader – Barra superior visible solo en mobile (<1024px).
 * Muestra: menú hamburguesa | nombre de la tienda | avatar del usuario.
 */
export default function MobileHeader({ storeName = 'Verdulería', onMenuOpen }) {
  return (
    <header
      id="mobile-header"
      className="lg:hidden flex items-center justify-between px-5 py-4
                 bg-white border-b border-stone-100 sticky top-0 z-40"
    >
      {/* Hamburger */}
      <button
        id="mobile-menu-btn"
        onClick={onMenuOpen}
        className="w-9 h-9 flex items-center justify-center rounded-xl
                   text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        aria-label="Abrir menú"
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      {/* Store name */}
      <p className="text-base font-extrabold text-stone-900">{storeName}</p>

      {/* User avatar */}
      <button
        id="user-avatar-btn"
        className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center
                   overflow-hidden border-2 border-green-700 cursor-pointer
                   hover:opacity-90 transition-opacity"
        aria-label="Perfil de usuario"
      >
        <span className="text-white text-sm font-bold">
          {storeName.charAt(0).toUpperCase()}
        </span>
      </button>
    </header>
  );
}
