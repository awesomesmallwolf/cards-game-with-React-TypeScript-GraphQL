// eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderRadius: {
      DEFAULT: '14px',
      sm: '10px',
      lg: '24px',
    },
    extend: {
      colors: {
        yellow: '#FFF48C',
        'yellow-dark': '#EFCE4B',
        red: '#F64242',
      },
      fontFamily: {
        alfa: ['Alfa Slab One', ...defaultTheme.fontFamily.sans],
        courier: ['Courier Prime', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'extra-big': ['4rem', '5.5rem'],
        large: ['5.625rem', '6.32rem'],
      },
      borderWidth: {
        3: '3px',
      },
      height: {
        66: '16.5rem',
      },
      rotate: {
        15: '15deg',
        7.5: '7.5deg',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        '-popup-2': {
          '0%': { transform: 'rotate(0) translate(18rem, -36vh) scale(0.2, 0.2)', opacity: 0 },
        },
        '-popup-1': {
          '0%': { transform: 'rotate(0) translate(6rem, -36vh) scale(0.2, 0.2)', opacity: 0 },
        },
        popup: {
          '0%': { transform: 'rotate(0) translate(-6rem, -36vh) scale(0.2, 0.2)', opacity: 0 },
        },
        'popup-1': {
          '0%': { transform: 'rotate(0) translate(-18rem, -36vh) scale(0.2, 0.2)', opacity: 0 },
        },
        'popup-2': {
          '0%': { transform: 'rotate(0) translate(-30rem, -36vh) scale(0.2, 0.2)', opacity: 0 },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        '-popup-2': '-popup-2 0.3s ease-in-out backwards',
        '-popup-1': '-popup-1 0.3s ease-in-out 0.05s backwards',
        popup: 'popup 0.3s ease-in-out 0.1s backwards',
        'popup-1': 'popup-1 0.3s ease-in-out 0.15s backwards',
        'popup-2': 'popup-2 0.3s ease-in-out 0.2s backwards',
      },
    },
  },
  plugins: [],
};
