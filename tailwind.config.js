
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#7F4F24',
        secondary: '#A68A64',
        light: '#C2C5AA',
        normal: '#374151'
      }
    },
  },
  plugins: [],
}