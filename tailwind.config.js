/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          blue: {
            DEFAULT: "#1A2A76",
            semiLight: "#b1c0fe",
            light: "#33407F",
            dark: "#1C2759"
          },
          red: {
            DEFAULT: "#FF007A"
          },
          green: "#34D299",
          gray: "#808080",
          yellow: "#FFFF00"
        }
      }
    },
  },
  plugins: [],
}
