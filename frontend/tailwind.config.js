/** @type {import('tailwindcss').Config} */

export default {

  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {

    extend: {

      colors: {

        navy: '#181b19',

        ink: '#252722',

        cyan: '#c4a16a',

        cloud: '#f4f1ea',

        white: '#faf8f2',

        slate: { 100: '#f0ede5', 200: '#dedbd3', 300: '#c9c7bd', 400: '#999b91', 500: '#72766c', 600: '#555b51', 700: '#3c453a', 800: '#2d352b', 900: '#181b19' },

      },

      boxShadow: {

        soft: '0 22px 70px rgba(11, 48, 40, 0.12)',

        glow: '0 22px 65px rgba(196, 161, 106, 0.26)',

        premium: '0 28px 90px rgba(11, 48, 40, 0.16)',

      },

      fontFamily: {

        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],

        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],

      },

    },

  },

  plugins: [],

};
