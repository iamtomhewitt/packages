import { ESLint } from 'eslint';
import sortImports from './sort-imports';

const customRules: ESLint.Plugin = {
  rules: {
    'sort-imports': sortImports,
  },
};

export default customRules