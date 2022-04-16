const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      'primary': 'rgb(20, 33, 61)',
      'secondary': 'rgb(247, 197, 72)',
      'secondary-transparent': 'rgba(247, 197, 72, .2)',
      'white': colors.white
    },
    extend: {},
  },
  plugins: [],
}
