import AppRouter from './routes/AppRouter';

/**
 * App – Raíz de la aplicación.
 *
 * El shell (AppShell o ClientShell) se aplica dentro de AppRouter
 * según el rol del usuario:
 *  - Admin autenticado → AppShell (sidebar completo, nav admin)
 *  - Cliente / no autenticado → ClientShell (nav simplificado)
 *  - /login → sin shell
 */
function App() {
  return <AppRouter />;
}

export default App;
