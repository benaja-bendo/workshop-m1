/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#BD2949',
        customRedHover: '#A8233F', // Ta variante de hover
      },
    },
  },
  plugins: [],
}

