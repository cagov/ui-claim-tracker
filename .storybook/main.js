const path = require('path')
const webpack = require('webpack')

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-i18next',
    'storybook-addon-next-router',
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
            includePaths: [path.resolve(__dirname, '../styles'), path.resolve(__dirname, '../node_modules')],
          },
        },
      },
    },
  ],
  webpackFinal: (config) => {
    // applicationinsights is meant for node.js applications, storybook uses a browser environment.
    // Use webpack's NormalModuleReplacementPlugin to mock the applicationinsights in storybook.
    // See https://webpack.js.org/plugins/normal-module-replacement-plugin
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/pino-applicationinsights/, 'node-noop'))

    // Mock logger functionality in storybook.
    // This is a relative path from the perspective of the file importing the logger, not of this file.
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/logger.ts/, '../.storybook/loggerMock.ts'))

    return {
      ...config,
      node: {
        ...config.node,
        fs: 'empty', // required for next-i18next
      },
    }
  },
}
