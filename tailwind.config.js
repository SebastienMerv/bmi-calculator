/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: {
        500: '#345FF6',
        200: '#D6E6FE',
        100: '#E7F5FE',
      },
      gray: {
        800: '#253347',
        400: '#5E6E85',
      },
      white: '#FFFFFF',
      pink: {
        500: '#FF97C9',
      },
      orange: {
        500: '#FFDBB9',
      },
      green: {
        500: '#70FFFF',
      }
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

