import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '../public/locales/en/common.json'
import enClaimDetails from '../public/locales/en/claim-details.json'
import enClaimStatus from '../public/locales/en/claim-status.json'

import esCommon from '../public/locales/es/common.json'
import esClaimDetails from '../public/locales/es/claim-details.json'
import esClaimStatus from '../public/locales/es/claim-status.json'

/* eslint-disable @typescript-eslint/no-floating-promises */
// Disabling this rule due to hitting a half hour of debugging,
// and considering this is a specialized file used only for tests

// Setup react-i18next for tests. Load actual content along with some mocked content.
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  ns: ['common', 'claim-details', 'claim-status', 'test'],
  defaultNS: 'common',
  resources: {
    en: {
      common: enCommon,
      'claim-details': enClaimDetails,
      'claim-status': enClaimStatus,
      test: {
        transLine: {
          plainString: 'just text',
          plainStringOneLink: 'first <0>second</0> third',
          plainStringLinks: 'first <0>second</0> <1>third</1>',
          plainStringLinksComplicated: '<1>first</1> <0>second</0> third <0>fourth</0> <1>fifth</1>',
          styledString: 'first <strong>second</strong> third',
          styledStringOneLink: 'first <strong>second</strong> <0>third</0>',
          styledLink: 'first <strong><0>second</0></strong>',
        },
        urls: {
          alpha: 'https://example.com/alpha',
          beta: 'https://example.com/beta',
        },
      },
    },
    es: { common: esCommon, 'claim-details': esClaimDetails, 'claim-status': esClaimStatus },
  },
})

/* eslint-enable @typescript-eslint/no-floating-promises */

// Export i18n so tests can manually set the lanuage with:
// i18n.changeLanguage('es')
export default i18n
