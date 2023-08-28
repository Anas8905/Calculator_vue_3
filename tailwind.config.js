/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "src/**/*.{vue,js,tsjsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "rgb(35, 202, 35)",
        "secondary-color": " rgb(3, 14, 21)",
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {

    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

