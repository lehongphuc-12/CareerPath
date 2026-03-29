import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { useStore } from '../../store/useStore';

export default function MainLayout() {
  const { theme } = useStore();

  useEffect(() => {
    console.log('Current theme:', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <Outlet />
      </main>
        <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6 lg:px-40 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Mentora</h2>
            </div>
            <div className="flex gap-8 text-slate-500 dark:text-slate-400 text-sm">
              <Link to="/about" className="hover:text-primary">Về chúng tôi</Link>
              <Link to="/contact" className="hover:text-primary">Liên hệ</Link>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">© 2024 Mentora. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
}
