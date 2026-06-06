export default {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@iamtomhewitt/linter',
    'prefer-arrow',
    'sort-keys-fix',
  ],
  rules: {
    '@iamtomhewitt/linter/sort-imports': 'error',
  },
};