const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
  // Handle SCSS modules
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true,
          },
        },
        sassLoaderOptions: {
          sassOptions: {
            includePaths: [
              path.resolve(__dirname, '../styles'),
              path.resolve(__dirname, '../node_modules'),
            ],
          },
        },
      },
    },
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      node: {
        ...config.node,
        fs: 'empty',
      },
    }
  },
}
