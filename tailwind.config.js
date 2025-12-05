/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
        "4k": "2560px",
      },
      colors: {
        hive: {
          yellow: "#facc15",
          dark: "#020617",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "hive-glow": "0 0 40px rgba(250, 204, 21, 0.25)",
      },
    },
  },
  plugins: [],
};
