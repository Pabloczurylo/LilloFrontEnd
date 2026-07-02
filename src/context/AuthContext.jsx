import { createContext, useContext, useState, useCallback } from 'react';

/**
 * AuthContext – Autenticación simple con credenciales mock.
 *
 * Roles:
 *  - 'admin'  → acceso completo (inventario, ventas, mermas, finanzas, admin promos)
 *  - null     → cliente (solo pedido, ofertas)
 *
 * Credenciales de prueba (mock):
 *  Email:     admin@lillo.com
 *  Contraseña: lillo2025
 *
 * El estado persiste en sessionStorage para que no se pierda al refrescar.
 */

/** ── Mock users ── */
const MOCK_USERS = [
  {
    id: 'u1',
    email: 'admin@lillo.com',
    password: 'lillo2025',
    name: 'Administrador',
    role: 'admin',
    initials: 'AD',
  },
];

const SESSION_KEY = 'lillo_auth_user';

/** Recupera la sesión guardada (si existe y es válida) */
function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Solo conservamos campos seguros (nunca la contraseña)
    return parsed?.id ? parsed : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());

  /**
   * login(email, password)
   * Retorna { ok: true } si las credenciales son válidas,
   * o { ok: false, error: string } si no.
   */
  const login = useCallback((email, password) => {
    const found = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!found) {
      return { ok: false, error: 'Correo o contraseña incorrectos.' };
    }

    // Guardamos solo los campos públicos (sin contraseña)
    const safeUser = {
      id: found.id,
      email: found.email,
      name: found.name,
      role: found.role,
      initials: found.initials,
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Hook de acceso rápido */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

export default AuthContext;
