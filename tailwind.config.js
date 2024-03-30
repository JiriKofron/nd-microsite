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
      screens: {
        'xs': '420px',
      },
      colors: {
        primary: 'var(--primary)',
        'primary-text': 'var(--primary-text)',
        orange: 'var(--orange)',
        yellow: 'var(--yellow)',
        'light-blue': 'var(--light-blue)',
        'pale-violet': 'var(--pale-violet)',
        'light-violet': 'var(--light-violet)',
        'dark-violet': 'var(--dark-violet)',
        salmon: 'var(--salmon)'
      },
      fontSize: {
        base: ['1.5rem', '2rem'],
        16: ['1.6rem', '2.1rem'],
        17: ['1.7rem', '2.4rem'],
        '17-21': ['1.7rem', '2.1rem'],
        20: ['2rem', '2.6rem'],
        '20-24': ['2rem', '2.4rem'],
        '20-26': ['2rem', '2.6rem'],
        22: ['2.2rem', '3rem'],
        '24-34':['2.4rem', '3.4rem'],
        25: ['2.5rem', '2.7rem'],
        'sm-heading': ['2.3rem', '2.6rem'],
        heading: ['2.6rem', '3rem'],
        30: ['3rem', '3.5rem'],
        40: ['4rem', '4.5rem'],
        'heading-large': ['4.5rem', '6rem'],
        clamp: 'clamp(2rem, 6.5vw, 3.5rem)'
      },
      borderRadius: {
        '30': '3rem',
        '10': '1rem'
      },
      boxShadow: {
        'warning-sign': '0 2px 6px rgba(107, 73, 142, 0.5)'
      }
    },
    fontFamily: {
      baloo: ["Baloo", 'sans-serif'],
      roboto: ['Roboto', 'serif']
    }
  },
  plugins: [],
}

