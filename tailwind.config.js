/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui : {
    themes: ["forest"],
  },
  theme: {
   
  },
  
  plugins: [require('tailwind-scrollbar'),require("daisyui")],
}
