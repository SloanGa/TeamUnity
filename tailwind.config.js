/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/layout.pug"],
  theme: {
    extend: {
      colors: {
        "blue-action": "#62b5e5",
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./public/style/style.css -o ./public/dist/style.css --watch
