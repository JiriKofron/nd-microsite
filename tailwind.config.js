/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6a498f'
      },
      fontSize: {
        heading: '2.5rem'
      }
    },
  },
  plugins: [],
}

