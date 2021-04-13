module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  extends: [
    'nava',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:prettier/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to autodetect the React version to use
    }
  },
  plugins: [
    'jest',
    'jest-dom',
    'react',
    'testing-library',
    '@typescript-eslint'
  ],
  rules: {
    "react/react-in-jsx-scope": "off", //React is provided by NextJS instead
    "react/prop-types": "off", //strict TypeScript provides the same benefits
  }
}
