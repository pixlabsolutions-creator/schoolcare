/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          700: "#9542E7",
        },
        icon1: {
          700: "#8F8F8F",
        },
        icon2: {
          700: "#2B3F6C",
        },
        textc1: {
          700: "#484848",
        },
        textc2: {
          700: "#999999",
        },
        textc3: {
          700: "#BABABA",
        },
        bgc: {
          700: "#F7F8FA",
        },
        success: {
          700: "#47A321",
        },
        pending: {
          700: "#F18021",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        kalpurush: ["Kalpurush", "sans-serif"],
      },
    },
  },
  plugins: [],
};
