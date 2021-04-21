module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    react: {
      useSuspense: false, //Explicitly set this to false to avoid conflicts with our i18n system
    }
  },
}
