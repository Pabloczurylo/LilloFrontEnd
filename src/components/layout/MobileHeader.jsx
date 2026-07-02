import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * MobileHeader – Barra superior del panel de administración (mobile <1024px).
 * Muestra: hamburguesa | nombre de la tienda | avatar con logout.
 */
export default function MobileHeader({ storeName = 'Verdulería', onMenuOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

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

      {/* User avatar + logout */}
      {user ? (
        <button
          id="user-logout-btn"
          type="button"
          onClick={handleLogout}
          className="w-9 h-9 rounded-full flex items-center justify-center
                     border-2 cursor-pointer hover:opacity-80 transition-opacity
                     text-white text-sm font-extrabold"
          style={{ background: '#1a5c1a', borderColor: '#2d7d2d' }}
          aria-label="Cerrar sesión"
          title={`${user.name} – Cerrar sesión`}
        >
          {user.initials}
        </button>
      ) : (
        <button
          id="user-avatar-btn"
          onClick={() => navigate('/login')}
          className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center
                     overflow-hidden border-2 border-green-700 cursor-pointer
                     hover:opacity-90 transition-opacity"
          aria-label="Iniciar sesión"
        >
          <LogOut size={16} strokeWidth={2} className="text-white" />
        </button>
      )}
    </header>
  );
}
