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
  plugins: [
    'jest',
    'react',
    'testing-library',
    '@typescript-eslint'
  ],
  rules: {
    "jest/no-try-expect": "off",

  }
}
