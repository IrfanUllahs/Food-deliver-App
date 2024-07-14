/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      cinzel: ["Cinzel", "serif"],
    },

    extend: {
      colors: {
        primary: "#39DB4A",
        secondary: "#444444",
      },

      screens: {
        custmd: "900px", // Example of a custom breakpoint
        // Add more breakpoints as needed
      },
    },
  },
  plugins: [],
};
