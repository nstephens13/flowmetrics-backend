module.exports = {
  testEnvironment: 'node', // jsdom for browser based environment
  roots: ['./src'],
  testMatch: ['**/__test__/**/*.spec.ts'], // looking for __test__ folders and *.spec.ts files
  moduleFileExtensions: ['js', 'ts', 'json'], // helps Jest recognize tested files by their extensions
  transform: {
    '^.+\\.ts$': 'ts-jest', // use ts-jest to transform .ts files before running tests
  },
  collectCoverage: true,
  coverageDirectory: './coverage',
};
