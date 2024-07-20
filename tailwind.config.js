/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#5502a6",
        "primary-hover": "#3a0173",
        "light": "#f3f0fc",
        "dark": "#080C1C",
      },
      fontFamily: {
        spartan: ['"League Spartan Variable"', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}

