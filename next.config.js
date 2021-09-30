const { i18n } = require('./next-i18next.config')

const isAzureEnv = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: '',
  i18n,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}
