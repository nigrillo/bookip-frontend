/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bookip: {
          light: "#00a88c",
          dark: "#0a8c73"
        }
      },
      fontFamily: {
        nimbus: ['"Nimbus Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
