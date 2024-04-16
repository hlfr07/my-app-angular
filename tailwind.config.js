/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      keyframes: {
        roll: {
          '0%': { transform: 'rotateX(45deg) rotateY(-45deg)'},
          '25%': { transform: 'rotateX(-45deg) rotateY(-45deg)'},
          '50%': { transform: 'rotateX(45deg) rotateY(45deg)'},
          '75%': { transform: 'rotateX(-45deg) rotateY(45deg)'},
          '100%': { transform: 'rotateX(45deg) rotateY(-45deg)'}
        }
      },
      animation: {
        roll: 'roll 5s infinite',
      }
    },
  },
  plugins: [],
}

