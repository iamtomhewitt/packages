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
    '@iamtomhewitt/linter',
    'prefer-arrow',
    'sort-keys-fix',
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        after: true,
        before: false,
        overrides: {
          arrow: {
            after: true,
            before: true,
          },
        },
      },
    ],
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
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};