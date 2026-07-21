/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        darkBg: '#0b0d11',
        darkSurface: '#12151c',
        darkSurface2: '#161a24',
        darkBorder: '#1e2330',
        lightBg: '#f0f2f7',
        lightSurface: '#ffffff',
        lightSurface2: '#f7f8fc',
        lightBorder: '#dce1ef',
        brandAccent: '#4fffb0',
        brandAccent2: '#7b61ff',
        mustBadge: '#ff5c5c',
        impBadge: '#ffa94d',
        goodBadge: '#34d399'
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        }
      }
    }
  },
  plugins: []
};
