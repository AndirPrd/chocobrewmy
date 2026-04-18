/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        choco: {
          50: '#f6efe8',
          100: '#ebdccd',
          200: '#d8bfa7',
          300: '#c39f80',
          400: '#ae8161',
          500: '#96684a',
          600: '#7a523b',
          700: '#5f3f2f',
          800: '#432d21',
          900: '#2d1d15',
        },
        cream: {
          50: '#fffdf8',
          100: '#fdf8ec',
          200: '#f7ecd5',
          300: '#efdfbe',
          400: '#e6cf9f',
          500: '#d8bc82',
          600: '#bea269',
          700: '#9e8352',
          800: '#7e6640',
          900: '#5a4a2f',
        },
        fresh: {
          mint: '#8eb99a',
          sage: '#6f8f74',
          peach: '#f2c19f',
          apricot: '#e8a87d',
        },
      },
      boxShadow: {
        cozy: '0 10px 30px rgba(67, 45, 33, 0.14)',
      },
      borderRadius: {
        cozy: '1.25rem',
      },
    },
  },
  plugins: [],
}
