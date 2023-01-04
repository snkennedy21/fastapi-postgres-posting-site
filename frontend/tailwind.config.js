/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#149DDE",
        secondary: "#6A6A95",
        lightBackground: "#3F4155",
        border: "#48495D",
        textPrimary: "#1D5569",
        darkBackground: "#2C2C37",
        textWhite: "#ECE9F6",
        textGrey: "#8B8D9D",
        textGrey: "#9798a7",
        textBlack: "#0f0f0f",
      },
      screens: {
        small: {
          min: "600px",
        },
      },
    },
  },
  plugins: [],
};
