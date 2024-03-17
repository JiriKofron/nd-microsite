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
        'primary-text': 'var(--primary-text)',
        orange: 'var(--orange)',
        yellow: 'var(--yellow)',
        'light-blue': 'var(--light-blue)',
        'light-violet': 'var(--light-violet)',
        'dark-violet': 'var(--dark-violet)'
      },
      fontSize: {
        base: ['1.5rem', '1.9rem'],
        17: ['1.7rem', '2.4rem'],
        20: ['2rem', '2.6rem'],
        22: ['2.2rem', '3rem'],
        'sm-heading': ['2.3rem', '2.6rem'],
        heading: ['2.6rem', '3rem'],
        'heading-large': ['4.5rem', '6rem'],
        clamp: 'clamp(2rem, 6.5vw, 3.5rem)'
      },
      borderRadius: {
        '30': '30px'
      }
    },
    fontFamily: {
      baloo: ["Baloo", 'sans-serif'],
      roboto: ['Roboto', 'serif']
    }
  },
  plugins: [],
}

