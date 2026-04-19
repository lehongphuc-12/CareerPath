import { Link, NavLink } from 'react-router-dom';
import { Rocket, Bell, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

export default function Navbar() {
  const { user, theme, toggleTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-primary/20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-10 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg text-white">
            <Rocket size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            CareerPath
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold text-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm'
            }
          >
            Khám phá
          </NavLink>
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold text-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm'
            }
          >
            Nghề nghiệp
          </NavLink>
          <NavLink
            to="/mentors"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold text-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm'
            }
          >
            Mentors
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold text-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm'
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold text-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm'
            }
          >
            Về chúng tôi
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-200 dark:hover:bg-primary/20 rounded-full transition-colors"
            title={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-slate-600" />
            ) : (
              <Sun size={20} className="text-slate-300" />
            )}
          </button>

          <button className="p-2 hover:bg-slate-200 dark:hover:bg-primary/20 rounded-full transition-colors relative">
            <Bell size={20} className="text-slate-600 dark:text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white dark:ring-background-dark"></span>
          </button>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Đăng ký
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Khám phá
          </Link>
          <Link to="/careers" onClick={() => setIsMenuOpen(false)}>
            Nghề nghiệp
          </Link>
          <Link to="/mentors" onClick={() => setIsMenuOpen(false)}>
            Mentors
          </Link>
          <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            Về chúng tôi
          </Link>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-center py-2 px-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
