/**
 * In order for Azure DevOps artifacts to be published for test results,
 * and code coverage metrics, we need to use jest-junit and cobertura
 * test and coverage reporters respectively.
 */
const outputDirectory = "<rootDir>/test-output";
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: outputDirectory,
  coverageReporters: ["cobertura"],
  reporters: ["default", ["jest-junit", { outputDirectory }]],
  roots: ["<rootDir>/src/"],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}

