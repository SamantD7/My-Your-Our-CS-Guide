import React, { useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeStore } from '../../store/themeStore';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-amber-400 animate-spin-slow" />
      ) : (
        <FiMoon className="w-5 h-5 text-purple-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
