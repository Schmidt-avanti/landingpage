/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use locally installed Poppins; no external (Google) font loading
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        'avanti-blue': '#172951', // Haupthintergrundfarbe (dunkelblau)
        'avanti-blue-light': '#224072', // Akzentfarbe (mittleres blau)
        'avanti-light-blue': '#40b5d2', // Highlight-Farbe (türkis) für Mouse-Over, Symbole, Rahmen
        'avanti-orange': '#fba919', // Kontrastfarbe (orange/gold)
        'avanti-text-dark': '#1E293B', // Dunkler Text
        'avanti-text-light': '#F8FAFC', // Heller Text
        'avanti-gray': '#64748B', // Grau für Nebentexte
        'avanti-bg-light': '#F1F5F9', // Heller Hintergrund
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'subtle-bounce': 'subtleBounce 2s infinite ease-in-out'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
