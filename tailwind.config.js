/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A498F',
        orange: '#E67F4F'
      },
      fontSize: {
        heading: '2.5rem'
      },
      borderRadius: {
        '30': '30px'
      }
    },
    fontFamily: {
      baloo: ["Baloo", 'sans-serif'],
      montserrat: ['Montserrat', 'serif'],
      roboto: ['Roboto', 'sans-serif']
    }
  },
  plugins: [],
}

