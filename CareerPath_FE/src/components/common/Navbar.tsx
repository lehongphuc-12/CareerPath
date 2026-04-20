import { Link, NavLink } from 'react-router-dom';
import { Rocket, Bell, Search, Menu, X, Sun, Moon, LogOut, ChevronDown } from 'lucide-react';
import { authService } from '../../services/authService';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

export default function Navbar() {
  const { user, setUser, theme, toggleTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.clearAuth();
    // @ts-ignore - setting user to null
    setUser(null);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

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
            {user ? (
              <div className="relative group">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-primary/10 transition-all"
                >
                  <div className="flex flex-col items-end hidden sm:flex px-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.name}</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Level {user.level}</span>
                  </div>
                  <div className="w-10 h-10 bg-primary/10 border-2 border-primary/20 rounded-xl flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-105 transition-transform">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Hồ sơ của tôi
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Cài đặt
                    </Link>
                    <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-bold"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
            {user ? (
              <>
                <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-2">
                  <div className="w-12 h-12 bg-primary/10 border-2 border-primary/20 rounded-xl flex items-center justify-center text-primary font-black text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-slate-800 dark:text-white uppercase tracking-tight">{user.name}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold self-start mt-1">Level {user.level}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-center py-3 px-4 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
