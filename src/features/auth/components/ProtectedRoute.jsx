import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

/**
 * ProtectedRoute – Guard para rutas exclusivas de administrador.
 *
 * Si el usuario NO está autenticado, redirige a /login y guarda
 * la ruta original en `location.state.from` para poder regresar
 * después de un login exitoso.
 *
 * Props:
 *  - children: el elemento a renderizar si está autenticado
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

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
