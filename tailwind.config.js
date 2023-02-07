/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["light", "dark", "garden", 
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
    extend: {
      fontFamily: {
        "leeseoyun": ['var(--font-leeseoyun)'],
        "gmarketSans": ['var(--font-gmarketSans)'],
      },
      backgroundImage: {
        "gradient-image": "url('/images/gradient.webp')", 
      }
    }
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide')
  ],
  basePath: '/home/landing',
}
