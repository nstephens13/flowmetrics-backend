module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    node: true,
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
    '@typescript-eslint/indent': 0, // deactivates intend
    '@typescript-eslint/no-unused-vars': 'error', // gives error if declared variable is not used
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // prohibits use of the ++ operator
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // warns against the use of dependencies in certain files
    'import/no-unresolved': 0, // checks import paths
    '@typescript-eslint/no-explicit-any': 0, // warns against the use of 'any' types
    'linebreak-style': ['error', 'unix'], // sets the desired end-of-line style
    'new-cap': 0, // concerns the use of the constructor with 'new'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn', // warning for explicit use of 'any'
        '@typescript-eslint/ban-types': 'warn', // warning for certain TypeScript types
      },
    },
  ],
};
