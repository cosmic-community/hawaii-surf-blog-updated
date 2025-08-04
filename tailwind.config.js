/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sand: {
          50: '#fefdf8',
          100: '#fefbf0',
          200: '#fdf5d9',
          300: '#fbeac2',
          400: '#f7d394',
          500: '#f3bc66',
          600: '#db9f3d',
          700: '#b8853d',
          800: '#956b3d',
          900: '#7a5832',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'wave-pattern': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
      }
    },
  },
  plugins: [],
}