import argsParser from 'args-parser';
import fs from 'fs';
import path from 'path';
import { ESLint } from 'eslint';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import customRules from '../custom-rules';
import { log, retailLinter } from '../lib';

const args = argsParser(process.argv);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lint = async () => {
  try {
    log.info('\nInspecting code...');
    const { sourceFolder, fix = false, ignorePatterns: userIgnore = '', type } = args;

    const ignorePatterns = retailLinter.eslintFilesIgnoredByDefault.concat(userIgnore.split(',')).filter(x => x);
    const eslintContents = fs.readFileSync(path.resolve(__dirname, '../rules', `${type}.json`)).toString();
    const baseRulesContents = fs.readFileSync(path.resolve(__dirname, '../rules', 'base-rules.json')).toString();
    const overrideConfig = JSON.parse(eslintContents);
    const baseRules = JSON.parse(baseRulesContents);
    const folderToLint = path.resolve(process.cwd(), sourceFolder);

    const rules = {
      ...baseRules,
      ...overrideConfig.rules,
    };

    overrideConfig.ignorePatterns = ignorePatterns;
    overrideConfig.rules = rules;

    const eslint = new ESLint({
      plugins: {
        'retail-linter': customRules,
      },
      overrideConfig: {
        ...overrideConfig,
        plugins: [
          ...(overrideConfig.plugins ?? []),
          'retail-linter',
        ],
        rules: {
          ...(overrideConfig.rules ?? {}),
          'retail-linter/sort-imports': 'error',
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