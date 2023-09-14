/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          black: {
            DEFAULT: "#000000",
            light: "#2d2c2ccf",
            medium: "#161616"
          },
          blue: {
            DEFAULT: "#1A2A76",
            semiLight: "#b1c0fe",
            light: "#33407F",
            dark: "#1C2759"
          },
          red: {
            DEFAULT: "#f32b6d"
          },
          green: "#41f35f",
          gray: {
            DEFAULT: "#2c2c2c",
            light: "#4c4c4c",
            dark: "#898989"
          },
          yellow: "#FFFF00",
          pink: {
            DEFAULT: "#ee217d",
            light: "#fa6126"
          },
          purple: "#c106c3",
          sweepMetrics: "#3936368a"
        }
      },
      gridTemplateColumns : {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      backgroundImage: {
        "rainbow": "linear-gradient(270deg,#d1fb9a,#dc5c02,#b62b18,#2e0aaf,#18bfcf,#3fea97,#d4d102,#fd7d1a,#e2178f)",
        "sweepr": "linear-gradient(270deg,#F2F2F2,#808080,#F2F2F2,#808080,#F2F2F2,#808080,#F2F2F2,#808080,#F2F2F2)",
        "footer": "linear-gradient(180deg,#000 75%,transparent),linear-gradient(90deg,#253cfc,#de1c81 50%,#f06029)",
        "l2s": "radial-gradient(50% 50% at 50% 50%,rgba(0,0,0,.6) 0,#000 100%),linear-gradient(45deg,#C005C6 25%,#F02279 37.5%,#FE4649 50%,#F9661E 62.5%,#FA9A08 75%)",
        "asset": "radial-gradient(60% 40% at 50% 0%,rgb(85 85 85 / 40%) 0,#000 100%)"
      },
      dropShadow: {
        "textShadow": "0 0 8px #fff"
      }
    },
  },
  plugins: [],
}
