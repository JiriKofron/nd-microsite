/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-purple)',
        orange: 'var(--orange)',
        yellow: 'var(--yellow)',
        'light-blue': 'var(--light-blue)',
        'light-violet': 'var(--light-violet)'
      },
      fontSize: {
        heading: '2.5rem',
        clamp: 'clamp(2rem, 7vw, 3.5rem)'
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

