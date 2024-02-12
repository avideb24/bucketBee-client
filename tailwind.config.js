/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#539aa0',
        secondary: '#333333',
        tertiary: '#fd3a13',
      },
    },
   
  },
  plugins: [require("daisyui")],

}

