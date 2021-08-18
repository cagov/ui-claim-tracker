/*
 * Preview.js is loaded in the Canvas tab, the “preview” iframe that renders your components in isolation. Use preview.js
 * for global code (such as CSS imports or JavaScript mocks) that applies to all stories.
 */
import '../styles/globals.scss'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { withI18next } from 'storybook-addon-i18next'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import enCommon from '../public/locales/en/common.json'
import enClaimDetails from '../public/locales/en/claim-details.json'
import enClaimStatus from '../public/locales/en/claim-status.json'

import esCommon from '../public/locales/es/common.json'
import esClaimDetails from '../public/locales/es/claim-details.json'
import esClaimStatus from '../public/locales/es/claim-status.json'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Claim Tracker',
        'Component',
        ['Page Section', ['Header', 'Main', 'Claim Section', 'Claim Status', 'Next Steps', 'Claim Details', 'Footer']],
        'Atoms',
      ],
    },
  },
}

export const decorators = [
  (Story, Context) => {
    i18n.use(initReactI18next).init({
      fallbackLng: 'en',
      ns: ['common', 'claim-details', 'claim-status'],
      defaultNS: 'common',
      debug: true,
      resources: {
        en: { common: enCommon, 'claim-details': enClaimDetails, 'claim-status': enClaimStatus },
        es: { common: esCommon, 'claim-details': esClaimDetails, 'claim-status': esClaimStatus },
      },
      react: {
        // Add support for <em>.
        // See https://react.i18next.com/latest/trans-component#using-for-less-than-br-greater-than-and-other-simple-html-elements-in-translations-v-10-4-0
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'em'],
      },
    })

    return <Story />
  },
  // Enable language support in Storybook using storybook-addon-i18n.
  withI18next({ i18n, languages: { en: 'English', es: 'Español' } }),
]
