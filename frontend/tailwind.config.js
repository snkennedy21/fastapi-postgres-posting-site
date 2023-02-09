/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#08a0e9",
        extraExtraLightGrey: "#F5F8FA",
        primaryTint: "#43b1e5",
        secondary: "#6A6A95",
        lightBackground: "#3F4155",
        border: "#eff3f4",
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
      rotate: {
        65: "65deg",
        75: "75deg",
        25: "25deg",
        15: "15deg",
        85: "85deg",
      },
    },
  },
  plugins: [],
};
