import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { useStore } from './store/useStore';
import { authService } from './services/authService';
import { authApi } from './api/authApi';
import { ToastContainer } from './components/common/Toast';

function App() {
  const { theme, setUser } = useStore();

  useEffect(() => {
    // Session recovery
    const initAuth = async () => {
      try {
        const user = await authApi.getMe();
        if (user) {
          // Map API user to store user (adding defaults for level/xp)
          setUser({
            ...user,
            level: 1,
            xp: 0
          });
          // Update persistence just in case
          authService.saveAuth({ user });
        }
      } catch (err) {
        // Only clear and log if we thought we were authenticated
        if (authService.isAuthenticated()) {
          console.warn('Session recovery failed:', err);
          authService.clearAuth();
          setUser(null as any);
        }
      }
    };

    initAuth();
  }, [setUser]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
}

export default App;
