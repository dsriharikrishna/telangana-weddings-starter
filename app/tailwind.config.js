/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#701A1E",
          deepMaroon: "#4E0D10",
          gold: "#D4AF37",
          lightGold: "#F9F1DC",
          cream: "#FCF9F2",
          charcoal: "#1F2937",
          sage: "#5A735E",
          coral: "#E05A47"
        }
      }
    },
  },
  plugins: [],
};

