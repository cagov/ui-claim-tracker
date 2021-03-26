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
    "jest/no-try-expect": "off",

  }
}