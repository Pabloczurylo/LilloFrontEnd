import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Store } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

/**
 * LoginPage – Pantalla de inicio de sesión para el panel de administración.
 * Ruta: /login
 *
 * Diseño fiel al mockup:
 *  - Fondo crema (#f0ede8)
 *  - Card blanca centrada con logo, título, campos y botón
 *  - Campos: Correo Electrónico + Contraseña (con toggle visibilidad)
 *  - Botón "Iniciar Sesión →"
 *  - Link "¿Nuevo personal? Solicitar Acceso"
 *
 * Credenciales mock:
 *  Email: admin@lillo.com  |  Contraseña: lillo2025
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Si venía de una ruta protegida, redirige allí tras el login
  const from = location.state?.from ?? '/reportes';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Pequeño delay artificial para que el botón no sea instantáneo
    await new Promise((r) => setTimeout(r, 400));

    const result = login(email, password);
    setLoading(false);

    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-10"
      style={{ background: 'linear-gradient(160deg, #ede9e3 0%, #f5f2ec 60%, #e8e4dc 100%)' }}
    >
      {/* ── Card principal ── */}
      <div
        className="w-full max-w-sm rounded-3xl bg-white overflow-hidden"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
        }}
      >
        {/* Barra decorativa superior */}
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(90deg, #1a5c1a 0%, #2d7d2d 50%, #4a9e4a 100%)' }}
        />

        <div className="px-8 py-9">
          {/* ── Logo + Títulos ── */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: '#edfaf0' }}
            >
              <Store size={32} strokeWidth={1.8} style={{ color: '#1a5c1a' }} />
            </div>
            <h1
              className="font-extrabold text-center"
              style={{ fontSize: '26px', color: '#0f2910', letterSpacing: '-0.5px' }}
            >
              Verdulería
            </h1>
            <p className="text-sm text-stone-400 mt-1 font-medium">
              Portal de Administración
            </p>
          </div>

          {/* ── Formulario ── */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Campo: Correo Electrónico */}
            <div className="mb-4">
              <label
                htmlFor="login-email"
                className="block text-sm font-bold text-stone-800 mb-2"
              >
                Correo Electrónico
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all"
                style={{
                  borderColor: error ? '#ef4444' : '#e5e3df',
                  background: '#faf9f7',
                }}
              >
                <Mail size={16} strokeWidth={1.8} style={{ color: '#9ca3af', shrink: 0 }} />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  className="flex-1 bg-transparent text-sm text-stone-800 placeholder-stone-400
                             outline-none font-medium"
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="login-password"
                  className="text-sm font-bold text-stone-800"
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold cursor-pointer transition-opacity hover:opacity-70"
                  style={{ color: '#1a5c1a' }}
                  onClick={() => {}}
                  tabIndex={-1}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all"
                style={{
                  borderColor: error ? '#ef4444' : '#e5e3df',
                  background: '#faf9f7',
                }}
              >
                <Lock size={16} strokeWidth={1.8} style={{ color: '#9ca3af' }} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                  className="flex-1 bg-transparent text-sm text-stone-800 placeholder-stone-400
                             outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="cursor-pointer transition-opacity hover:opacity-70 shrink-0"
                  style={{ color: '#9ca3af' }}
                >
                  {showPassword
                    ? <Eye size={16} strokeWidth={1.8} />
                    : <EyeOff size={16} strokeWidth={1.8} />
                  }
                </button>
              </div>

              {/* Error message */}
              {error && (
                <p
                  className="text-xs font-semibold mt-2"
                  style={{ color: '#dc2626', animation: 'fadeIn 0.2s ease' }}
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl
                         text-white font-extrabold text-[15px] cursor-pointer
                         transition-all hover:opacity-95 active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? '#2d7d2d'
                  : 'linear-gradient(135deg, #1a5c1a 0%, #2d7d2d 100%)',
              }}
            >
              {loading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  />
                  Verificando…
                </>
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* ── Footer ── */}
          <p className="text-center text-sm text-stone-400 mt-6 font-medium">
            ¿Nuevo personal?{' '}
            <span
              className="font-bold cursor-pointer hover:underline"
              style={{ color: '#1a5c1a' }}
              onClick={() => {}}
              role="button"
              tabIndex={0}
            >
              Solicitar Acceso
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
