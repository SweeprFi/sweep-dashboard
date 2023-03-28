const path = require("path");

module.exports = {
  webpack: {
    alias: {
      '@modules': path.resolve(__dirname, "src/modules/"),
      '@pages': path.resolve(__dirname, "src/pages/"),
      '@components': path.resolve(__dirname, "src/components/"),
      '@config': path.resolve(__dirname, "src/config/"),
      '@utils': path.resolve(__dirname, "src/utils/"),
      '@assets': path.resolve(__dirname, "src/assets/"),
      '@abis': path.resolve(__dirname, "src/assets/abis/"),
      '@fonts': path.resolve(__dirname, "src/fonts/"),
      '@styles': path.resolve(__dirname, "src/assets/css/"),
      '@images': path.resolve(__dirname, "src/assets/images/"),
    }
  }
};