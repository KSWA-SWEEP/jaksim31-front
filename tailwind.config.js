/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", 
      {
        mytheme: {
          "primary": "#3C2707",
          "secondary": "#e7e5e4",
          "accent": "#fed7aa",
          "neutral": "#f5f5f4",
          "base-100": "#f5f5f4",
          "info": "#ccfbf1",
          "success": "#e0e7ff",
          "warning": "#fef08a",
          "error": "#fca5a5",
        },
      },
    ],
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      custom1 : ["LeeSeoyun", "GangwonEdu", "sans-serif", "GmarketSansLight", "GmarketSansMedium", "GmarketSansBold"],
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide')
  ],
  basePath: '/home/landing',
}
