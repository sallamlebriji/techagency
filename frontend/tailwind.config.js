/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#081a33',
        ink: '#13263f',
        cyan: '#25d7d7',
        cloud: '#f5fafb',
      },
      boxShadow: {
        soft: '0 22px 70px rgba(8, 26, 51, 0.12)',
        glow: '0 22px 65px rgba(37, 215, 215, 0.26)',
        premium: '0 28px 90px rgba(8, 26, 51, 0.16)',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Quicksand', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
