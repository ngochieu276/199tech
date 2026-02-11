/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FCD535',
          hover: '#F0B90B',
          dim: 'rgba(252, 213, 53, 0.1)'
        },
        background: {
          DEFAULT: '#1E2329',
          secondary: '#2B3139',
          tertiary: '#474D57'
        },
        text: {
          primary: '#EAECEF',
          secondary: '#848E9C',
          tertiary: '#5E6673'
        },
        status: {
          success: '#0ECB81',
          danger: '#F6465D',
          warning: '#F0B90B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
