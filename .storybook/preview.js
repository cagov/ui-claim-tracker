/*
 * Preview.js is loaded in the Canvas tab, the “preview” iframe that renders your components in isolation. Use preview.js
 * for global code (such as CSS imports or JavaScript mocks) that applies to all stories.
 */
import '../styles/globals.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
