/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js,jsx}",
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 16px rgba(17, 17, 26, 0.1)', // Custom shadow
      },
    },
    container: {
      center: true
    }
  },
  plugins: [],
}

