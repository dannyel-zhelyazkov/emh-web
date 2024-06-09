import variables from '@mertasan/tailwindcss-variables'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.ts.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        glass: '6.1px',
      },
      fontSize: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
        body: '1rem',
        'lead-p': '1.1rem',
        small: '0.9rem',
        large: '1.2rem',
        xlarge: '1.4rem',
        quotes: '1.1rem',
        lg: '24px',
      },
      colors: {
        white: {
          DEFAULT: '#FFF7F7',
          50: '#FFF7F790',
        },
        black: {
          DEFAULT: '#1C1427',
          50: '#1C142790',
          25: '#1C142745',
        },
        secondary: {
          DEFAULT: '#27005D',
          50: '#27005D90',
          25: '#27005D45',
        },
        main: {
          DEFAULT: '#9400FF',
          50: '#9400FF90',
          25: '#9400FF45',
        },
        blue: '#AED2FF',
        'lite-blue': {
          DEFAULT: '#E4F1FF',
          50: '#E4F1FF90',
          25: '#E4F1FF40',
        },
        success: {
          DEFAULT: '#7ECA9C',
          75: '#7ECA9Cba',
          50: '#7ECA9C90',
          25: '#7ECA9C45',
        },
        warning: {
          DEFAULT: '#F8E559',
          75: '#F8E559ba',
          50: '#F8E55990',
          25: '#F8E55945',
        },
        error: {
          DEFAULT: '#E43F5A',
          75: '#E43F5Aba',
          50: '#E43F5A90',
          25: '#E43F5A45',
        },
      },
      border: {
        DEFAULT: '1px',
        2: '2px',
      },
      borderRadius: {
        DEFAULT: '24px',
        half: '12px',
      },
    },
  },
  plugins: [
    variables,
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.glass': {
          color: theme('colors.white'),
          boxShadow: theme('boxShadow.glass'),
          backgroundColor: theme('colors.main.50'),
          borderRadius: theme('borderRadius.DEFAULT'),
          border: `1px solid ${theme('colors.lite-blue.25')}`,
          backdropFilter: 'blur(25px)',
        },
        '.search-list-search': {
          maxHeight: '20%',
        },
        '.search-list-content': {
          maxHeight: '80%',
        },
        '.toast-box': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '14px',
          left: 'calc(100% - 366px)',
          width: '350px',
          zIndex: '20',
          minHeight: '150px',
          marginBottom: '12px',
          padding: '12px',
          borderRadius: theme('borderRadius.DEFAULT'),
          border: `1px solid ${theme('colors.lite-blue.25')}`,
          backdropFilter: 'blur(25px)',
        },
      })
    }),
  ],
}
