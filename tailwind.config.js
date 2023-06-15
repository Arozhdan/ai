/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#1723C7",
        "background": {
          DEFAULT: "#F8F8F8",
          success: "#EBF4E7",
        }
      }
    },
  },
  plugins: [],
}