/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#543212',
        'color-2': '#93571f',
        'color-3': '#d27c2d',
        'color-4': '#e0a46c',
        'color-5': '#edcbab',
      },
    },
  },
  plugins: [],
}
