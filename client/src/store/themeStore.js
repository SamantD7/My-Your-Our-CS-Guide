import { create } from 'zustand';
import { getLocalTheme, setLocalTheme } from '../utils/storage';

export const useThemeStore = create((set, get) => ({
  theme: getLocalTheme(),
  
  initTheme: () => {
    const theme = get().theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    setLocalTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: newTheme });
  }
}));
