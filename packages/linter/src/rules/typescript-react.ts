export default {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    '@typescript-eslint',
    'retail-linter',
    'prefer-arrow',
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true,
          },
        },
      },
    ],
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'never',
        children: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
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
          single: 2,
          multi: 1,
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
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
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
    'react/no-unused-prop-types': [
      'error',
    ],
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
    'react/no-unescaped-entities': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};