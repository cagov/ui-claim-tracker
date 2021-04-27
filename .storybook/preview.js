/*
 * Preview.js is loaded in the Canvas tab, the “preview” iframe that renders your components in isolation. Use preview.js
 * for global code (such as CSS imports or JavaScript mocks) that applies to all stories.
 */
import '../styles/globals.scss';
import { initReactI18next } from 'react-i18next'
import i18n from './i18n';

import enCommon from '../public/locales/en/common.json'
import enHeader from '../public/locales/en/header.json'
import enFooter from '../public/locales/en/footer.json'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Claim Tracker', 'Component', ['Atom', 'Page Section'], 'Example'],
    }
  }
}

export const decorators = [
  (Story, Context) => {
    i18n.use(initReactI18next).init({

      lng: 'en',
      fallbackLng: 'en',
      ns: ['common', 'header'],
      defaultNS: 'common',
      resources: {
        en: { common: enCommon, header: enHeader, footer: enFooter },
      },
    })

    return <Story />
  },
]
