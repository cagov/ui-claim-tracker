const { i18n } = require('./next-i18next.config')

const assetPrefix =
  process.env.ASSET_PREFIX === 'undefined' || process.env.ASSET_PREFIX === undefined
    ? '/claimstatus'
    : process.env.ASSET_PREFIX

module.exports = {
  assetPrefix: assetPrefix,
  i18n,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}
