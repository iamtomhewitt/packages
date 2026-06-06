export default {
  '@iamtomhewitt/linter/sort-imports': 'error',
  'arrow-spacing': [
    'error',
    {
      after: true,
      before: true,
    },
  ],
  'brace-style': [
    'error',
    'stroustrup',
  ],
  'comma-dangle': [
    'error',
    'always-multiline',
  ],
  'comma-spacing': [
    'error',
    {
      after: true,
      before: false,
    },
  ],
  curly: [
    'error',
  ],
  'func-style': [
    'error',
    'expression',
    {
      allowArrowFunctions: true,
    },
  ],
  indent: [
    'error',
    2,
    {
      SwitchCase: 1,
    },
  ],
  'jsx-quotes': [
    2,
    'prefer-single',
  ],
  'key-spacing': [
    'error',
    {
      afterColon: true,
      beforeColon: false,
      mode: 'strict',
    },
  ],
  'keyword-spacing': [
    'error',
    {
      after: true,
      before: true,
    },
  ],
  'lines-between-class-members': [
    'error',
    'always',
  ],
  'max-len': 'off',
  'no-console': 'off',
  'no-import-assign': 'off',
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1,
    },
  ],
  'object-curly-newline': [
    'error',
    {
      ExportDeclaration: {
        minProperties: 3,
        multiline: true,
      },
      ImportDeclaration: 'never',
      ObjectExpression: {
        minProperties: 1,
        multiline: true,
      },
      ObjectPattern: {
        multiline: true,
      },
    },
  ],
  'object-curly-spacing': [
    'error',
    'always',
    {
      arraysInObjects: true,
      objectsInObjects: true,
    },
  ],
  'object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: false,
    },
  ],
  'padded-blocks': [
    'error',
    'never',
  ],
  'prefer-arrow-callback': [
    'error',
    {
      allowNamedFunctions: true,
    },
  ],
  'prefer-arrow/prefer-arrow-functions': [
    'error',
    {
      classPropertiesAllowed: false,
      disallowPrototype: true,
      singleReturnOnly: false,
    },
  ],
  'prefer-destructuring': [
    'error',
    {
      array: false,
      object: true,
    },
  ],
  'quote-props': [
    'error',
    'as-needed',
  ],
  quotes: [
    'error',
    'single',
  ],
  semi: [
    'error',
    'always',
  ],
  'semi-spacing': [
    'error',
    {
      after: true,
      before: false,
    },
  ],
  'sort-keys-fix/sort-keys-fix': [
    'error',
  ],
  'space-before-blocks': [
    'error',
    'always',
  ],
  'space-before-function-paren': [
    'error',
    'always',
  ],
  'space-in-parens': [
    'error',
    'never',
  ],
  'space-infix-ops': 'error',
};