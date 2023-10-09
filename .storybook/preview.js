/*
 * Preview.js is loaded in the Canvas tab, the “preview” iframe that renders your components in isolation. Use preview.js
 * for global code (such as CSS imports or JavaScript mocks) that applies to all stories.
 */
import '../public/styles/globals.scss'
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

import viCommon from '../public/locales/vi/common.json'
import viClaimDetails from '../public/locales/vi/claim-details.json'
import viClaimStatus from '../public/locales/vi/claim-status.json'

import zhSCommon from '../public/locales/zh-Hans/common.json'
import zhSClaimDetails from '../public/locales/zh-Hans/claim-details.json'
import zhSClaimStatus from '../public/locales/zh-Hans/claim-status.json'

import zhTCommon from '../public/locales/zh-Hant/common.json'
import zhTClaimDetails from '../public/locales/zh-Hant/claim-details.json'
import zhTClaimStatus from '../public/locales/zh-Hant/claim-status.json'

import hyCommon from '../public/locales/hy/common.json'
import hyClaimDetails from '../public/locales/hy/claim-details.json'
import hyClaimStatus from '../public/locales/hy/claim-status.json'

import koCommon from '../public/locales/ko/common.json'
import koClaimDetails from '../public/locales/ko/claim-details.json'
import koClaimStatus from '../public/locales/ko/claim-status.json'

import tlCommon from '../public/locales/tl/common.json'
import tlClaimDetails from '../public/locales/tl/claim-details.json'
import tlClaimStatus from '../public/locales/tl/claim-status.json'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Claim Status Tracker',
        ['Page', '404'],
        'Component',
        ['Page Section', ['Header', 'Main', [ 'Claim Section', [ 'Claim Status', 'Claim Details']], 'Footer']],
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
        vi: { common: viCommon, 'claim-details': viClaimDetails, 'claim-status': viClaimStatus },
        zhS: { common: zhSCommon, 'claim-details': zhSClaimDetails, 'claim-status': zhSClaimStatus },
        zhT: { common: zhTCommon, 'claim-details': zhTClaimDetails, 'claim-status': zhTClaimStatus },
        hy: { common: hyCommon, 'claim-details': hyClaimDetails, 'claim-status': hyClaimStatus },
        ko: { common: koCommon, 'claim-details': koClaimDetails, 'claim-status': koClaimStatus },
        tl: { common: tlCommon, 'claim-details': tlClaimDetails, 'claim-status': tlClaimStatus },
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
  withI18next({ i18n, languages: { en: 'English', es: 'Español', vi: 'Vietnamese', zhS: 'Chinese (Simplified)', zhT: 'Chinese (Traditional)', hy: 'Armenian', ko: 'Korean', tl: 'Tagalog' } }),
]
