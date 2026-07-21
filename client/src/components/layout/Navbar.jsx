import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useClerk } from '@clerk/clerk-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'DSA', path: '/dsa' },
    { label: 'Aptitude', path: '/aptitude' },
    { label: 'Web Development', path: '/webdev' },
    { label: 'AI Engineer', path: '/ai-engineer' }
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[var(--surface)] rounded-[10px] flex items-center justify-center">
                <span className="font-syne font-extrabold text-lg gradient-text">CS</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-bold text-sm tracking-tight text-[var(--text)]">
                My/Your/Our CS Guide
              </span>
              <span className="font-mono text-[10px] text-[var(--muted)]">
                My learning • Your prep • Our community
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[var(--surface2)] text-[var(--accent)] font-semibold border border-[var(--border)] shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Tools & Auth */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] pl-3 pr-1 py-1 rounded-xl">
                <div className="flex items-center gap-2">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full bg-[var(--surface2)] border border-[var(--accent)] object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-xs">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-[var(--text)] max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--surface2)] transition-colors"
                  title="Logout"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 text-xs font-semibold text-black bg-[var(--accent)] rounded-lg hover:brightness-110 shadow-sm transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-[var(--surface2)] text-[var(--accent)] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-[var(--text)]">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs text-red-400 border border-red-500/20 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold text-[var(--text)] border border-[var(--border)] rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-semibold text-black bg-[var(--accent)] rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
