module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['src/database/**/*.ts'],
  env: {
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:import/typescript', 'prettier'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never',
      },
    ],
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_', // Ignore variables starting with underscore
        argsIgnorePattern: '^_', // Ignore arguments starting with underscore
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'linebreak-style': ['error', 'unix'],
    'new-cap': 0,
  },
  plugins: ['@typescript-eslint', 'prettier'],
};
