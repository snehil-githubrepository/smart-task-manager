/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "border-move": "borderMove 2s ease-in-out",
      },
      keyframes: {
        borderMove: {
          "0%": {
            transform: "translateX(0)",
            borderColor: "transparent",
            borderWidth: "2px",
          },
          "50%": {
            transform: "translateX(10px)",
            borderColor: "#3490dc",
            borderWidth: "4px",
          },
          "100%": {
            transform: "translateX(0)",
            borderColor: "transparent",
            borderWidth: "2px",
          },
        },
      },
    },
  },
  plugins: [],
};
