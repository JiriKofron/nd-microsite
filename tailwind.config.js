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
        green: 'var(--green)',
        salmon: 'var(--salmon)',
        danger: 'var(--danger)',
        'light-gray': 'var(--light-gray)',
        'text-gray':'var(--text-gray)'
      },
      fontSize: {
        sm: ['1.4rem', '1.7rem'],
        base: ['1.5rem', '2rem'],
        16: ['1.6rem', '2.1rem'],
        17: ['1.7rem', '2.3rem'],
        20: ['2rem', '2.6rem'],
        22: ['2.2rem', '3rem'],
        '24-34':['2.4rem', '3.4rem'],
        heading: ['2.5rem', '2.7rem'],
        30: ['3rem', '3.5rem'],
        40: ['4rem', '4.5rem'],
        'heading-large': ['4rem', '5rem'],
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

