const { i18n } = require('./next-i18next.config')

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/claimstatus',
        permanent: true,
        locale: false,
      },
    ]
  },
  i18n,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = {
      fs: 'empty'
    }
    return config
  },
}
