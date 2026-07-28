import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiZap, FiChevronRight } from 'react-icons/fi';
import { useClerk } from '@clerk/clerk-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'DSA', path: '/dsa' },
    { label: 'Aptitude', path: '/aptitude' },
    { label: 'Web Development', path: '/webdev' },
    { label: 'AI Engineer', path: '/ai-engineer' }
  ];

  // Scroll effect detection for dynamic height & backdrop intensity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <nav
        className={`w-full backdrop-blur-xl transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[var(--bg)]/85 border-[var(--border)] shadow-xl shadow-black/10 py-2.5'
            : 'bg-[var(--bg)]/60 border-[var(--border)]/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with Hover Rotation & Shimmer */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] via-teal-400 to-[var(--accent2)] p-0.5 shadow-lg shadow-[var(--accent)]/20 group-hover:shadow-[var(--accent)]/40 transition-all duration-300"
              >
                <div className="w-full h-full bg-[var(--surface)] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  {/* Subtle inner shiny glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-syne font-black text-lg gradient-text tracking-wider relative z-10">
                    CS
                  </span>
                </div>
              </motion.div>

              <div className="flex flex-col">
                <span className="font-syne font-extrabold text-sm tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1.5">
                  My/Your/Our CS Guide
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block text-[var(--accent)]"
                  >
                    <FiZap className="w-3 h-3 animate-pulse text-[var(--accent)]" />
                  </motion.span>
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)] tracking-wide">
                  My learning • Your prep • Our community
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links with Animated Active Gliding Pill */}
            <div className="hidden md:flex items-center gap-1 bg-[var(--surface)]/50 p-1.5 rounded-2xl border border-[var(--border)]/70 backdrop-blur-md shadow-inner">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className="relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 select-none"
                  >
                    {({ isActive: routeActive }) => {
                      const active = item.path === '/' ? location.pathname === '/' : routeActive;
                      return (
                        <>
                          {/* Animated Gliding Active Pill */}
                          {active && (
                            <motion.div
                              layoutId="activeNavPill"
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--surface2)] to-[var(--surface)] border border-[var(--border)] shadow-md"
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 32,
                              }}
                            >
                              {/* Bottom Accent Glow Line */}
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_8px_rgba(79,255,176,0.8)]" />
                            </motion.div>
                          )}
                          <span
                            className={`relative z-10 transition-colors duration-200 ${
                              active
                                ? 'text-[var(--accent)] font-bold'
                                : 'text-[var(--muted)] hover:text-[var(--text)]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </>
                      );
                    }}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Side Tools & Auth Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />

              {isAuthenticated ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 bg-[var(--surface)]/80 border border-[var(--border)] pl-3 pr-1.5 py-1.5 rounded-2xl shadow-sm backdrop-blur-md"
                >
                  <div className="flex items-center gap-2.5">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-full bg-[var(--surface2)] border border-[var(--accent)]/50 object-cover ring-2 ring-[var(--accent)]/20"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)]/30 to-[var(--accent2)]/30 text-[var(--accent)] border border-[var(--accent)]/40 flex items-center justify-center font-bold text-xs shadow-sm">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="text-xs font-bold text-[var(--text)] max-w-[120px] truncate">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-xl text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <FiLogOut className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/signup"
                      className="relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-black bg-gradient-to-r from-[var(--accent)] via-teal-300 to-[var(--accent)] rounded-xl shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 transition-all duration-300 overflow-hidden group"
                    >
                      <span>Sign Up</span>
                      <FiChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[var(--muted)] hover:text-[var(--text)] bg-[var(--surface)]/80 border border-[var(--border)] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <FiX className="w-5 h-5 text-[var(--accent)]" /> : <FiMenu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Animated Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-[var(--border)]/70 bg-[var(--surface)]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 mt-2 shadow-2xl"
            >
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-[var(--surface2)] text-[var(--accent)] border border-[var(--border)] font-bold shadow-sm'
                          : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)]/50'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <FiChevronRight className="w-4 h-4 opacity-60" />
                  </NavLink>
                </motion.div>
              ))}

              <div className="pt-3 border-t border-[var(--border)]">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-2 pt-1">
                    <div className="flex items-center gap-2">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-xs">
                          {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <span className="text-xs font-bold text-[var(--text)]">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 text-xs font-semibold text-red-400 border border-red-500/30 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2.5 text-xs font-bold text-[var(--text)] border border-[var(--border)] rounded-xl bg-[var(--surface)] hover:bg-[var(--surface2)] transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2.5 text-xs font-extrabold text-black bg-[var(--accent)] rounded-xl shadow-md hover:brightness-110 transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
