export default {
  extends: 'eslint:recommended',
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@iamtomhewitt/linter',
    'prefer-arrow',
  ],
  rules: {
    '@iamtomhewitt/linter/sort-imports': 'error',
  },
};