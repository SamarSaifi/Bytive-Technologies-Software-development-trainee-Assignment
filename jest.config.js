module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Assuming you're testing in a browser-like environment
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest', // Use SWC to transform TypeScript and JSX files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
