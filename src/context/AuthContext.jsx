import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { loginAPI, getMeAPI } from '../services/authService';

/**
 * AuthContext – Autenticación real contra el backend.
 *
 * Roles:
 *  - 'admin'    → acceso completo (inventario, ventas, mermas, finanzas, admin promos)
 *  - 'empleado' → acceso reducido (sin acceso a rutas solo admin)
 *  - null       → cliente (solo pedido, ofertas)
 *
 * El JWT se guarda en localStorage para persistir entre sesiones.
 * Al iniciar la app, si hay token guardado, se valida contra /api/auth/me.
 */

const TOKEN_KEY = 'lillo_token';
const USER_KEY  = 'lillo_user';

/** Recupera el usuario guardado del localStorage */
function loadStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => loadStoredUser());
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  /**
   * Al montar: si hay token guardado, lo verificamos contra /api/auth/me.
   * Esto asegura que si el token expiró o fue revocado, se limpia la sesión.
   */
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    getMeAPI()
      .then((profile) => {
        setUser(profile);
        localStorage.setItem(USER_KEY, JSON.stringify(profile));
      })
      .catch(() => {
        // Token inválido o expirado → limpiar sesión
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  /**
   * login(mail, password)
   * Llama a POST /api/auth/login, guarda el token y el perfil.
   * Retorna { ok: true } o { ok: false, error: string }.
   */
  const login = useCallback(async (mail, password) => {
    try {
      const { token, user: profile } = await loginAPI(mail, password);

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(profile));
      setUser(profile);

      return { ok: true };
    } catch (err) {
      const message =
        err.response?.data?.error ?? 'Error al conectar con el servidor.';
      return { ok: false, error: message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const isAdmin         = user?.rol === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, loading, login, logout }}
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
