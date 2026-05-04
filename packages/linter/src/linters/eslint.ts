import argsParser from 'args-parser';
import path from 'path';
import { ESLint } from 'eslint';

import customRules from '../custom-rules';
import rules from '../rules';
import { linter, log } from '../lib';

const args = argsParser(process.argv);

const lint = async () => {
  try {
    log.info('\nInspecting code...');
    const { sourceFolder, fix = false, ignorePatterns: userIgnore = '', type = '' } = args;

    const ignorePatterns = linter.eslintFilesIgnoredByDefault.concat(userIgnore.split(',')).filter(x => x);
    const rulesKey = type.replace('-r', 'R').replace('-t', 'T');
    const overrideConfig = (rules as any)[rulesKey];
    const { baseRules } = rules;
    const folderToLint = path.resolve(process.cwd(), sourceFolder);

    overrideConfig.ignorePatterns = ignorePatterns;
    overrideConfig.rules = {
      ...baseRules,
      ...overrideConfig.rules,
    };

    const eslint = new ESLint({
      plugins: {
        '@iamtomhewitt/linter': customRules,
      },
      overrideConfig: {
        ...overrideConfig,
        plugins: [
          ...(overrideConfig.plugins ?? []),
          '@iamtomhewitt/linter',
        ],
        rules: {
          ...(overrideConfig.rules ?? {}),
          '@iamtomhewitt/linter/sort-imports': 'error',
        },
      },
      fix,
    });

    const results = await eslint.lintFiles([folderToLint]);

    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter('stylish');
    const resultText = await formatter.format(results);
    const totalErrors = results.filter(result => result.errorCount > 0).length;
    const totalWarnings = results.filter(result => result.warningCount > 0).length;
    const hasErrors = totalErrors > 0;
    const hasWarnings = totalWarnings > 0;

    if (hasErrors || hasWarnings) {
      log.log(resultText);
      const exitCode = hasErrors ? 1 : 0;
      return exitCode;
    }

    log.success('Code is all good!');
    return 0;
  }
  catch (err: any) {
    log.error(`Error running eslint: ${err}`);
    return 1;
  }
};

export const eslint = {
  lint,
};