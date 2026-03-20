/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            backgroundPosition: 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            backgroundPosition: 'right center'
          }
        }
      }
    },
  },
  plugins: [],
}