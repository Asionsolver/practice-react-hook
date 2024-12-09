/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gunMetal: "#2B2C37",
        slateBlue: "#635fc7"
      }
    },
  },
  plugins: [],
}

