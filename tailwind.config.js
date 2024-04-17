/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    fontFamily: {
      nav: ["Assistant", "sans-serif"],
      nav1: ["Poppins", "sans-serif"],
      body: ["Arapey", "serif"],
    },
    extend: {
      colors: {
        firstblue: "#62b5e5",
        secondblue: "#001489",
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./public/style/style.css -o ./public/dist/style.css --watch
