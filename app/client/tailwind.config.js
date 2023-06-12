/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  variants: {
    lineClamp: ['responsive']
  },
  theme: {
    extend: {
      colors: {
        "nightbg": "#D3C3B6",
        "night": "#FCF8F5",
        "404": "#EF6950",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        'xy110': '110% 108%',
      },
      maxHeight: {
        '3/5': '60%',
        '4/5': '80%',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33%',
        '2/3': '66%',
        '4/5': '80%',
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
        "overflow": "110%",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "7": "28px",
        "8": "32px",
        "9": "36px",
        "10": "40px",
        "11": "44px",
        "12": "48px",
      },
      backgroundImage: {
        'login': "url('./UI/13.svg')",
        'login-mobile': "url('./UI/4.svg')",
        'logo': "url('./UI/logo.svg')"
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '920px',
        // => @media (min-width: 640px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1920px',
        // => @media (min-width:1920px) { ... }
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true }),
  require('@neojp/tailwindcss-line-clamp-utilities')],
})
