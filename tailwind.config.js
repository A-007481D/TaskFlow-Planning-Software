/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}","./*.{html,js}"],
  theme: {
    extend: {
      color:{
        primary : "#ccc"
      }
    },
  },
  plugins: [],
}

