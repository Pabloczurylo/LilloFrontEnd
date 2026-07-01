import AppShell from './components/layout/AppShell';
import AppRouter from './routes/AppRouter';

/**
 * App – Raíz de la aplicación.
 * AppShell provee el layout (sidebar desktop / mobile header + bottom nav).
 * AppRouter define las rutas dentro del shell.
 */
function App() {
  return (
    <AppShell>
      <AppRouter />
    </AppShell>
  );
}

export default App;
