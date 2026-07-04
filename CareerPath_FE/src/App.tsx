import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { useStore } from './store/useStore';
import { authService } from './services/authService';
import { authApi } from './api/authApi';
import { ToastContainer } from './components/common/Toast';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    console.group("📊 AnalyticsTracker");

    if (!GA_MEASUREMENT_ID) {
      console.groupEnd();
      return;
    }

    try {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });

    } catch (err) {
      console.error("❌ Failed to send pageview", err);
    }

    console.groupEnd();
  }, [location]);

  return null;
}

function App() {
  const { theme, setUser } = useStore();

  useEffect(() => {
    console.group("🚀 Google Analytics Init");


    if (!GA_MEASUREMENT_ID) {
      console.error("❌ GA ID not found");
      console.groupEnd();
      return;
    }

    try {
      ReactGA.initialize(GA_MEASUREMENT_ID);
    } catch (err) {
      console.error("❌ ReactGA initialize failed", err);
    }

    console.groupEnd();
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authApi.getMe();

        if (user) {
          setUser({
            ...user,
            level: 1,
            xp: 0,
          });

          authService.saveAuth({ user });
        }
      } catch (err) {
        if (authService.isAuthenticated()) {
          console.warn("Session recovery failed:", err);
          authService.clearAuth();
          setUser(null as any);
        }
      }
    };

    initAuth();
  }, [setUser]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      <AnalyticsTracker />
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
}

export default App;