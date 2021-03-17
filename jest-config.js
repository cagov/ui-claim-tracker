module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}

//const outputDirectory = "<rootDir>/test-output";
  //snapshotSerializers: ["enzyme-to-json/serializer"],
  //coverageDirectory: outputDirectory,
  //coverageReporters: ["cobertura"], //for Azure DevOps
  //reporters: ["default", ["jest-junit", { outputDirectory }]], //for Azure DevOps
