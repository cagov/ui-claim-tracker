import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  react: {
    // Add support for <em>.
    // See https://react.i18next.com/latest/trans-component#using-for-less-than-br-greater-than-and-other-simple-html-elements-in-translations-v-10-4-0
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'em'],
  },
})

export default i18n
