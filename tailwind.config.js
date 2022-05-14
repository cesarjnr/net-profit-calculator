module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(234, 240, 255)',
          100: 'rgb(197, 210, 236)',
          800: 'rgb(16, 31, 61)',
          900: 'rgb(6, 21, 51)'
        },
        secondary: {
          400: 'rgb(247, 199, 33)'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
