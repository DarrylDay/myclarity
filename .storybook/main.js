const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx', 
    '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    //'@storybook/addon-postcss',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
      "@backend": path.resolve(__dirname, '../src/backend/'),
      "@components": path.resolve(__dirname, '../src/components/'),
      "@generated": path.resolve(__dirname, '../src/generated/'),
      "@models": path.resolve(__dirname, '../src/models/'),
      "@pages": path.resolve(__dirname, '../src/pages/'),
      "@tests": path.resolve(__dirname, '../src/tests/'),
      "@theme": path.resolve(__dirname, '../src/theme/'),
      "@utils": path.resolve(__dirname, '../src/utils/')
    };
    // config.module.rules.push({
    //     test: /\.css$/,
    //     use: [
    //       {
    //         loader: 'postcss-loader',
    //         options: {
    //           postcssOptions: {
    //             plugins: [
    //               require('tailwindcss'),
    //               require('autoprefixer'),
    //             ],
    //           },
    //         },
    //       },
    //     ],
    //     include: path.resolve(__dirname, '../'),
    //   })
    return config;
  },
};