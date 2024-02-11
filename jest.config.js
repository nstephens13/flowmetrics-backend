const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node', // jsdom for browser based environment
  // roots: ['./src'],
  testMatch: ['**/__test__/**/*.spec.ts'], // looking for __test__ folders and *.spec.ts files
  moduleFileExtensions: ['js', 'ts', 'json'], // helps Jest recognize tested files by their extensions
  transform: {
    '^.+\\.ts$': 'ts-jest', // use ts-jest to transform .ts files before running tests
  },
  collectCoverage: true,
  coverageDirectory: './coverage',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /* , { prefix: '<rootDir>/' } */),
};
