import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { useStore } from './store/useStore';
import { authService } from './services/authService';
import { authApi } from './api/authApi';

function App() {
  const { theme, setUser } = useStore();

  useEffect(() => {
    // Session recovery
    const initAuth = async () => {
      // Use cached user as a hint that we might have a session cookie
      if (authService.isAuthenticated()) {
        try {
          const user = await authApi.getMe();
          // Map API user to store user (adding defaults for level/xp)
          setUser({
            ...user,
            level: 1,
            xp: 0
          });
        } catch (err) {
          console.error('Session recovery failed:', err);
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
    </Router>
  );
}

export default App;
