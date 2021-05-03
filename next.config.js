const { i18n } = require('./next-i18next.config')

module.exports = {
  // The Claim Tracker application must live at /claimstatus because IDM Webgate 
  // expects the "context root" to be /claimstatus, and all other pages must be sub-paths.
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
