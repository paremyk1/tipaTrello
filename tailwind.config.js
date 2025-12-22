/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        trello: {
          background: '#0b3254',
          card: '#f4f5f7',
          list: '#ebecf0',
          text: '#172b4d',
          primary: '#0d6efd',
        },
      },
      boxShadow: {
        card: '0 1px 0 rgba(9,30,66,.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
