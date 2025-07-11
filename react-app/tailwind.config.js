// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#fd8d3d',
        'main-blue': '#082041',
        'light-blue': '#43bede'
      },
    },
  },
  plugins: [],
}