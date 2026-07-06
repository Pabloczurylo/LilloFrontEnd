import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

/**
 * ProtectedRoute – Guard para rutas exclusivas de administrador.
 *
 * Comportamiento:
 *  1. Si aún se está verificando el token (loading=true) → muestra pantalla en blanco
 *     para evitar el flash de redirect a /login mientras se valida.
 *  2. Si NO está autenticado → redirige a /login guardando la ruta original.
 *  3. Si está autenticado → renderiza los children.
 *
 * Props:
 *  - children: el elemento a renderizar si está autenticado
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mientras se verifica el token guardado, no redirigimos todavía
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0ede8',
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '3px solid #d1d5db',
            borderTopColor: '#1a5c1a',
            animation: 'spin 0.8s linear infinite',
            display: 'block',
          }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}
