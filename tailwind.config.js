/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,hbs,ts,js}",
    "./src/views/**/*.hbs",
    "./dist/views/**/*.hbs",
    "./public/**/*.html",
    "./views/**/*.hbs"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 