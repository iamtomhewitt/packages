export default {
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  globals: {
    Map: true,
    Promise: true,
    Set: true,
    WeakMap: true,
    __DEV__: false,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      spread: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    '@iamtomhewitt/linter',
    'prefer-arrow',
    'sort-keys-fix',
  ],
  rules: {
    'react/button-has-type': 0,
    'react/hook-use-state': [
      'error',
    ],
    'react/jsx-boolean-value': [
      'error',
      'never',
    ],
    'react/jsx-closing-bracket-location': [
      'error',
    ],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-newline': 'error',
    'react/jsx-curly-spacing': [
      'error',
      {
        children: true,
        when: 'never',
      },
    ],
    'react/jsx-equals-spacing': [
      'error',
      'never',
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-first-prop-new-line': [
      'error',
      'multiline-multiprop',
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: {
          multi: 1,
          single: 2,
        },
      },
    ],
    'react/jsx-newline': [
      'error',
      {
        prevent: false,
      },
    ],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        afterOpening: 'never',
        beforeClosing: 'never',
        beforeSelfClosing: 'always',
        closingSlash: 'never',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        arrow: 'parens-new-line',
        declaration: 'parens-new-line',
        logical: 'parens-new-line',
        return: 'parens-new-line',
      },
    ],
    'react/no-deprecated': 'warn',
    'react/no-multi-comp': [
      'error',
      {
        ignoreStateless: true,
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react/no-unused-prop-types': [
      'error',
    ],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 0,
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'react/sort-prop-types': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};