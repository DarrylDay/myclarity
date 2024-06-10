const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    alias: {
      "@backend": path.resolve(__dirname, 'src/backend/'),
      "@components": path.resolve(__dirname, 'src/components/'),
      "@generated": path.resolve(__dirname, 'src/generated/'),
      "@models": path.resolve(__dirname, 'src/models/'),
      "@pages": path.resolve(__dirname, 'src/pages/'),
      "@tests": path.resolve(__dirname, 'src/tests/'),
      "@theme": path.resolve(__dirname, 'src/theme/'),
      "@utils": path.resolve(__dirname, 'src/utils/')
    }
  }
};